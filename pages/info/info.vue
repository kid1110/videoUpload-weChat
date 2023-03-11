<template>
	<view class="example">
		<!-- 基础用法，不包含校验规则 -->
		<uni-forms ref="baseForm" :modelValue="userInfo" labelPosition="left" labelWidth="80px" :rules="rules"
			validateTrigger="bind">
			<uni-forms-item label="姓名" required name="name">
				<uni-easyinput v-model="userInfo.name" placeholder="请输入姓名"
					@blur="binddata('name',$event.detail.value)" />
			</uni-forms-item>
			<uni-forms-item label="年龄" required name="age">
				<uni-easyinput v-model="userInfo.age" placeholder="请输入年龄" @blur="binddata('age',$event.detail.value)" />
			</uni-forms-item>
			<uni-forms-item label="性别" required>
				<uni-data-checkbox v-model="userInfo.gender" :localdata="sexs" />
			</uni-forms-item>
			<uni-forms-item label="是否建身" required>
				<uni-data-checkbox v-model="userInfo.gym" :localdata="gyms" />
			</uni-forms-item>
			<uni-forms-item label="职业" required name="profession">
				<uni-easyinput v-model="userInfo.profession" placeholder="请输入您的职业"
					@blur="binddata('profession',$event.detail.value)"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item label="身高" required>
				<picker mode="selector" :range="tallList" :value="tallIndex" @change="tallChange">
					{{tallList[tallIndex]}}</picker>
			</uni-forms-item>
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
					tall: 0,
					uid: 0,
					education: 0,
				},
				// 单选数据源
				sexs: [{
					text: '保密',
					value: 0
				}, {
					text: '女',
					value: 1
				}, {
					text: '男',
					value: 2
				}],
				gyms: [{
					text: '保密',
					value: 0
				}, {
					text: '是',
					value: 1
				}, {
					text: '否',
					value: 2
				}],
				// 身高列表
				tallList: [],
				eduList: ["小学以下", "小学", "初中", "高中", "大学专科", "大学本科", "硕士", "博士", "博士后"],
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
					profession: {
						rules: [{
							required: true,
							errorMessage: '请填写职业',
						}, {
							maxLength: 100,
							errMessage: "职业名称不能大于100字"
						}]
					}
				}
			}
		},
		computed: {
		},
		onShow() {
			let jwt = uni.getStorageSync("token")
			this.userInfo.uid = Number(jwt_decode(jwt).uid)
		},
		onLoad() {},
		onReady() {
			//初始化身高
			this.initTallList();
			
			// 设置自定义表单校验规则，必须在节点渲染完毕后执行
			// this.$refs.customForm.setRules(this.customRules)
		},
		methods: {
			//提交表单
			submit() {
				this.$refs['baseForm'].validate().then(res => {
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
		align-items: center;
	}

	// .update-btn{

	// }
</style>
