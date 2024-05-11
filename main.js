const func_code = ["读保持寄存器(0x03)", "读输入寄存器(0x04)"];
const data_type = ["有符号整型", "无符号整型", "有符号长整型", "无符号长整型", "单精度浮点型", "双精度浮点型"];
const config_names = ["ipaddr", "gateway", "submask", "mqtt_addr", "mqtt_port", "username", "password", "sub_topic", "pub_topic", "pub_time"];
const modbus_names = ["dev_addr", "read_time", "format"];
const analog_labels = {"名称：" : "name", "系数：" : "coefficient", "常数：" : "constant", "单位：" : "unit"};
const reg_labels = {"名称：" : "name", "功能码：" : "func_code", "寄存器地址：" : "addr", "数据类型：" : "data_type", "系数：" : "coefficient", "常数：" : "constant", "单位：" : "unit"};

var num = 0;

function add_reg () {
	if (num < 10) {
		num++;
		var reg = document.createElement("div");
		reg.setAttribute("class", "reg_list");
		reg.setAttribute("id", "reg"+num);

		for (const [key, value] of Object.entries(reg_labels)) {
			var label = document.createElement("label");
			label.setAttribute("for", "reg"+num+"_"+value);
			label.innerHTML = key;
			reg.appendChild(label);

			var item = 0;
			if (key === "功能码：") {
				item = document.createElement("select");
				item.setAttribute("id", "reg"+num+"_"+value);
				item.setAttribute("name", "reg"+num+"_"+value);
				for (const [k, v] of Object.values(func_code).entries()) {
					var option = document.createElement("option");
					option.setAttribute("value", k+3);
					option.innerHTML = v;
					item.appendChild(option);
				}
			} else if (key === "数据类型：") {
				item = document.createElement("select");
				item.setAttribute("id", "reg"+num+"_"+value);
				item.setAttribute("name", "reg"+num+"_"+value);
				for (const [k, v] of Object.values(data_type).entries()) {
					var option = document.createElement("option");
					option.setAttribute("value", k);
					option.innerHTML = v;
					item.appendChild(option);
				}
			} else {
				item = document.createElement("input");
				if (key === "名称：") {
					item.setAttribute("type", "text");
					item.setAttribute("maxlength", "15");
				} else if (key === "单位：") {
					item.setAttribute("type", "text");
					item.setAttribute("maxlength", "15");										
				} else if (key === "寄存器地址：") {
					item.setAttribute("type", "number");
					item.setAttribute("oninput", "if (value<1) value=1; if(value>65535) value=65535;");
				} else {
					item.setAttribute("type", "number");
					item.setAttribute("step", "0.001");					
				}
				
				item.setAttribute("id", "reg"+num+"_"+value);
				item.setAttribute("name", "reg"+num+"_"+value);
			}

			reg.appendChild(item);
		}

		document.getElementById("reg_list").appendChild(reg);
	} else {
		alert("抱歉，加不了了！");
		return;
	}
}

function remove_reg() {
	if (num > 0) {
		document.getElementById("reg"+num).remove();
		num--;
	} else {
		alert("抱歉，已经没有了！");
	}
}

function submit_config() {
	var network = [], mqtt = [], voltage = [], current = [], modbus = [];

	for (const [k, v] of config_names.entries()) {
		if (k <= 2) {
			network.push(document.getElementById(v).value);
		} else {
			mqtt.push(document.getElementById(v).value);
		}
	}

	for (const [k, v] of Object.values(analog_labels).entries()) {
		voltage.push(document.getElementById("volt_"+v).value);
	}

	for (const [k, v] of Object.values(analog_labels).entries()) {
		current.push(document.getElementById("curr_"+v).value);
	}

	for (const [k, v] of modbus_names.entries()) {
		modbus.push(document.getElementById(v).value);
	}

	var post_object = {};
	post_object["dtu_id"] = document.getElementById("dtu_id").value;
	post_object["dev_id"] = document.getElementById("dev_id").value;
	post_object["net"] = network;
	post_object["mqtt"] = mqtt;

	if (document.getElementById("sensor_volt").checked == true) {
		post_object["voltage"] = voltage;
	}

	if (document.getElementById("sensor_curr").checked == true) {
		post_object["current"] = current;
	}

	if (document.getElementById("sensor_modbus").checked == true) {
		post_object["modbus"] = modbus;

		for (var i=1; i<=num; i++) {
			var register = [];
			for (const [k, v] of Object.values(reg_labels).entries()) {
				register.push(document.getElementById("reg"+i+"_"+v).value);
			}
			if (register.length == Object.values(reg_labels).length) {
				post_object["reg"+i] = register;
			} else {
				break;
			}
		}
	}

	fetch('/', {
		method: "POST",
		body: JSON.stringify(post_object),
		headers: {
			"Content-type": "application/json",
		}
	})
	.then((response) => response.text())
	.then((data) => document.write(data));
}

function add_submit_button() {
	var form = document.getElementById("post_form");
	var input = document.createElement("input");
	input.setAttribute("type", "button");
	input.setAttribute("id", "submit");
	input.setAttribute("value", "提交");
	input.setAttribute("onclick", "submit_config()");
	form.appendChild(input);
}

function display_sensor_setting(sensor) {
	document.getElementById('sensor_volt_setting').style.display = "none";
	document.getElementById('sensor_curr_setting').style.display = "none";
	document.getElementById('sensor_modbus_setting').style.display = "none";

	document.getElementById(sensor).style.display = "block";
}
