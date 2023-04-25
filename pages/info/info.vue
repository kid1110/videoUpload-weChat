<template>
	<view class="example">
		<!-- 基础用法，不包含校验规则 -->
		<uni-forms ref="baseForm" :modelValue="userInfo" labelPosition="left" labelWidth="80px" :rules="rules"
			validateTrigger="bind">
			<uni-forms-item label="姓名" required name="name">
				<text class="name-text">为保护您的隐私，您的姓名可以用拼音或昵称，不必真实姓名</text>
				<uni-easyinput v-model="userInfo.name" placeholder="请输入姓名"
					@blur="binddata('name',$event.detail.value)" />
			</uni-forms-item>
			<text class="name-text">请您如实填写下面信息，其真实和有效性会促进水平的进步</text>
			<uni-forms-item label="年龄" required name="age">
				<uni-easyinput v-model="userInfo.age" placeholder="请输入年龄" @blur="binddata('age',$event.detail.value)" />
			</uni-forms-item>
			<uni-forms-item label="性别" required>
				<uni-data-checkbox v-model="userInfo.gender" :localdata="sexs" />
			</uni-forms-item>
			<uni-forms-item label="每周主动锻炼" required>
				<uni-data-checkbox v-model="userInfo.gym" :localdata="gyms" />
			</uni-forms-item>
			<uni-forms-item label="职业" required>
				<uni-data-checkbox v-model="userInfo.profession" :localdata="profession" class="profession"></uni-data-checkbox>
				<!-- <uni-easyinput v-model="userInfo.profession" placeholder="请输入您的职业"
					@blur="binddata('profession',$event.detail.value)"></uni-easyinput> -->
			</uni-forms-item>
			<uni-forms-item label="体重" required name="weight">
				<uni-easyinput v-model="userInfo.weight" placeholder="请输入您的体重(kg)"
					@blur="binddata('weight',$event.detail.value)">
				</uni-easyinput>
			</uni-forms-item>
			<uni-forms-item label="身高" required name="height">
				<uni-easyinput v-model="userInfo.tall" placeholder="请输入您的身高(cm)"
					@blur="binddata('height',$event.detail.value)">
				</uni-easyinput>
			</uni-forms-item>
			<!-- <uni-forms-item label="身高" required>
				<picker mode="selector" :range="tallList" :value="tallIndex" @change="tallChange">
					{{tallList[tallIndex]}}</picker>
			</uni-forms-item> -->
			<uni-forms-item label="教育程度" required>
				<picker mode="selector" :range="eduList" @change="eduChange">{{eduList[eduIndex]}}</picker>
			</uni-forms-item>
		</uni-forms>
		<button type="primary" class="update-btn" size="mini" @click="submit" :loading="startSubmit" :disabled="startSubmit">提交信息</button>
	</view>
</template>

<script>
	import jwt_decode from "jwt-decode"
	import {insertUserInfo} from '@/utils/api.js'
	export default {
		data() {
			return {
				startSubmit: false,
				tallIndex: 0,
				eduIndex: 0,
				// 基础表单数据
				userInfo: {
					name: '',
					age: '',
					gender: 0,
					gym: 0,
					profession: "",
					tall: '',
					uid: 0,
					education: 0,
					weight: ''
				},
				// 单选数据源
				sexs: [{
					text: '女',
					value: 0
				}, {
					text: '男',
					value: 1
				}],
				gyms: [{
					text: '1小时以下',
					value: 0
				}, {
					text: '1-2小时',
					value: 1
				},{
					text: '2小时以上',
					value: 2
				}],
				profession: [{
					text: '学生',
					value: '学生'
				},{
					text: '在职',
					value: '在职'
				},{
					text: '待业',
					value: '待业'
				},{
					text: '退休',
					value: '退休'
				}],
				// 身高列表
				// tallList: [],
				eduList: ["小学以下", "小学", "初中", "高中", "大学专科", "大学本科", "硕士", "博士"],
				//校验规则
				rules: {
					name: {
						rules: [{
							required: true,
							errorMessage: '姓名不能为空',
						}]
					},
					age: {
						rules: [{
							required: true,
							errorMessage: '年龄不能为空',
						}, {
						format: 'number',
						errorMessage: '年龄只能为数字'
					}]
					},
					weight: {
						rules: [{
							required: true,
							errorMessage: '体重不能为空',
						}, {
						format: 'number',
						errorMessage: '体重只能为数字'
					}]
					},
					height: {
						rules: [{
							required: true,
							errorMessage: '身高不能为空',
						}, {
						format: 'number',
						errorMessage: '身高只能为数字'
					}]
					},
				}
			}
		},
		computed: {
		},
		onShow() {
			let jwt = uni.getStorageSync("token")
			this.userInfo.uid = Number(jwt_decode(jwt).uid)
		},
		onShareAppMessage(res){
			if(res.from === 'button'){
				console.log(res.target)
			}
			return {
				title: "分享视频上传系统",
				path: "/pages/info/info"
			}
		},
		onLoad() {},
		onReady() {
			//初始化身高
			// this.initTallList();
			
			// 设置自定义表单校验规则，必须在节点渲染完毕后执行
			// this.$refs.customForm.setRules(this.customRules)
		},
		methods: {
			//提交表单
			submit() {
				this.$refs['baseForm'].validate().then(res => {
					if(res == undefined){
						return
					}
					console.log('success', res)
					console.log('entity',this.userInfo)
					//验证成功则可以上传数据
					this.startSubmit = true
					insertUserInfo(this.userInfo).then(res=>{
						console.log(res)
						if(res.code === 1){
							uni.showToast({
								duration: 1000,
								title:"上传成功",
								icon:"success"
							})
							//修改状态
							uni.setStorageSync("info",true)
							this.startSubmit = false
							setTimeout(()=>{
								//返回上一页
								uni.navigateBack(1)
							},1000)
							
						}else{
							this.startSubmit = false
						}
					})

				}).catch(err => {
					console.log('err', err)
				})
			},
			tallChange(e) {
				console.log("test", e.detail.value)
				this.tallIndex = Number(e.detail.value)
				console.log(typeof this.tallIndex)
				this.userInfo.tall = this.tallIndex+100
			},
			eduChange(e) {
				this.eduIndex = Number(e.detail.value)
				this.userInfo.education = this.eduIndex
			},
			initTallList() {
				for (let i = 100; i < 261; i++) {
					this.tallList.push(i + 'cm');
				}
			},
		}
	}
</script>

<style lang="scss">
	.uni-forms-item.is-direction-left {
		align-items: center;
	}

	.example {
		padding: 15px;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.segmented-control {
		margin-bottom: 15px;
	}

	.button-group {
		margin-top: 15px;
		display: flex;
		justify-content: space-around;
	}

	.form-item {
		display: flex;
		align-items: flex-start;
	}
	.name-text{
		font-size: 30rpx;
		color: grey;
	}
	


	// .update-btn{

	// }
</style>
