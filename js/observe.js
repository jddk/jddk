/*
 * @name:
 * @Date: 2020-09-11 14:22:45
 * @LastEditTime: 2020-09-17 15:52:10
 * @FilePath: \jddk\js\observe.js
 * @permission:
 */
import Dep from "./dep.js";
//  数据劫持，监测到data中的数据的变化，如果是改变就广播修改
export default class Observe {
	constructor(vm) {
		this.$vm = vm;
		this.$data = vm.$data;
		this.observe();
	}

	observe() {
		let that = this;
		Object.keys(that.$data).forEach((key) => {
			defineProperty(that.$data, key, that.$data[key]);
		});
		// 检测data中数据
		function defineProperty(data, key, value) {
			let dep = new Dep();
			Object.defineProperty(data, key, {
				get() {
					if (window.target) {
						dep.on(window.target);
					}
					return value;
				},
				set(newVal) {
					if (newVal != value) {
						value = newVal;
						dep.emit();
					}
				},
			});
		}
	}
}
