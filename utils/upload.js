import SparkMD5 from 'spark-md5'
import {APIS} from '@/staticData/Api.js'

// 上传api封装
export const postConsloe = (options)=>{
	let header = {...options.header}
	return new Promise((resolve,reject) =>{
			uni.request({
				url: APIS.console,
				method: options.method || 'POST',
				data: options.data || {},
				dataType: 'json',
				header,
				success: (res) =>{
					if(res.data){
						if (res.data.code === '1') {
						    resolve(res.data.data)
						} else {
							reject(res.data.msg)
						}
					}
				},
				fail: (err)=>{
					reject(err)
				}
			})
	})
}

export default class BigUpload{
	constructor(Setting){
		this.Setting = Setting
	}
	
	startUpload(){
		this.chunkSize = this.Setting.size
		if(!this.Setting.filePath){
			return
		}
		this.uploadTask = this.Setting.uploadTask
		this.percent = this.Setting.percent
		this.pt_md5 = ''
		this.chunks = Math.ceil(this.Setting.byteLength / this.size)
		this.currentChunk = 0
		this.gowith = true
		this.fileSlice(0,this.Setting.byteLength,file=>{
			this.handshake(flag =>{
				if(flag){
					this.loadNext()
				}else{
					this.Setting.callback(false)
				}
			},file)
		})
	}
	handshake(cbk,e){
		let formData = {}
		let md5 = this.getDataMd5(e)
		this.pt_md5 = md5
		formData.pt_md5 = this.pt_md5
		formData.chunks = this.chunks
		formData.size = this.Setting.byteLength
		formData.type = 'handshake'
		formData.md5 = md5
		formData.fileName = this.Setting.fileName
		formData.contentType = this.Setting.type
		postConsloe({
			url: this.Setting.url,
			data: formData,
			header: this.Setting.jwt
		}).then(res =>{
			if(res.code === '1'){
				cbk(true)
			}else{
				this.currentChunk = res
				if(this.currentChunk <this.chunks){
					this.loadNext()
				}else{
					this.currentChunk--
					this.loadNext()
				}
			}
		}).catch( err =>{
			console.error(err)
			cbk(false)
		})
	}
	
	loadNext(){
		const p = this.currentChunk *100 / this.chunks
		this.drowSpeed(parseInt(p))
		let start = this.currentChunk * this.chunkSize
		let length = start + this.chunkSize >= this.Setting.byteLength ? this.Setting.byteLength-start : this.chunkSize
		if(this.gowith){
			this.fileSlice(start,length,file=>{
				this.uploadFileBinary(file)
			})
		}
		
	}
	
	drowSpeed(){
		if(this.Setting.drowSpeed != null && typeof(this.Setting) === 'function'){
			this.Setting.drowSpeed(p)
		}
	}
	
	fileSlice(start,length, cbk){
		uni.getFileSystemManager().readFile({
			filePath: this.Setting.filePath,
			encoding: 'binary',
			position: start,
			length: length,
			success: res=>{
				let md5 = this.getDataMd5(res.data)
				console.log(md5)
				cbk(res.data)
			},
			fail: err =>{
				console.error(err)
				this.callback(false)
			}
		})
	}
	uploadFileBinary(data){
		//获取文件handler
		const fs = uni.getFileSystemManager()
		//获取md5
		const md5 = this.getDataMd5(data)
		//创建临时文件
		const tempPath = `${wx.env.USER_DATA_PATH}/up_temp/${md5}.temp`
		//授权创建
		fs.access({
			path: `${wx.env.USER_DATA_PATH}/up_temp`,
			fail(res){
				fs.mkdirSync(`${wx.env.USER_DATA_PATH}/up_temp`,false)
			}
		})
		//写入文件系统
		fs.writeFile({
			filePath: tempPath,
			encoding: 'binary',
			data: data,
			success: res=>{
				let forData = {}
				FormData.currentChunk = this.currentChunk+1
				FormData.pt_md5 = this.pt_md5
				form.type = 'file'
				FormData.md5 = md5
				uni.uploadFile({
					url: this.Setting.url,
					filePath: tempPath,
					name: 'file',
					formData: FormData,
					success: res2=>{
						fs.unlinkSync(tempPath)
						if(res2.statusCode === 200){
							const data = JSON.parse(res2.data)
							if(data.code === '1'){
								this.currentChunk++
								if(this.currentChunk < this.chunks){
									this.loadNext()
								}else{
									this.callback(data.data)
								}
								return true
							}
						}
						this.callback(false)
					},
					fail: err=>{
						console.log(err)
						this.callback(false)
					}
				})
			},
			fail: err=>{
				console.log(err)
				this.callback(false)
			}
		})
	}
	
	getDataMd5(data){
		if(data){
			let trunkSpark = new SparkMD5()
			trunkSpark.appendBinary(data)
			let md5 = trunkSpark.end()
			return md5
		}
	}
	callback(res){
		if( typeof (this.Setting.callback) === 'function'){
			this.Setting.callback(res)
		}
	}
}