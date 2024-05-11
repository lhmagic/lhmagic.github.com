function set_values () {
	document.getElementById("dtu_id").setAttribute("value", dtu_id);
	document.getElementById("dev_id").setAttribute("value", dev_id);

	// set config values
	for (const [k,v] of config_names.entries()) {
		document.getElementById(v).setAttribute("value", config[k]);
	}

	// set voltage values
	if (typeof voltage != "undefined") {
		for (const [k,v] of Object.values(analog_labels).entries()) {
			document.getElementById("volt_"+v).setAttribute("value", voltage[k]);
		}

		document.getElementById('sensor_volt').setAttribute("checked", true);
		display_sensor_setting("sensor_volt_setting");
	}

	// set current values
	if (typeof current != "undefined") {
		for (const [k,v] of Object.values(analog_labels).entries()) {
			document.getElementById("curr_"+v).setAttribute("value", current[k]);
		}

		document.getElementById('sensor_curr').setAttribute("checked", true);
		display_sensor_setting("sensor_curr_setting");
	}

	//set modbus values
	if (typeof modbus != "undefined") {
		for (const [k,v] of modbus_names.entries()) {
			var item = document.getElementById(v);
			if (v == 'format') {
				display_selected_value(item, modbus[k]);
			} else {
				item.setAttribute("value", modbus[k]);
			}
		}

		// set register values
		for (const i in registers) {
			add_reg();
			for (const [k, v] of Object.values(reg_labels).entries()) {
				var item = document.getElementById("reg"+num+"_"+v);
				if (v == 'func_code') {
					display_selected_value(item, registers[i][k]);
				} else if (v == 'data_type') {
					display_selected_value(item, registers[i][k]);
				} else {
					item.setAttribute("value", registers[i][k]);				
				}
			}
		}

		document.getElementById('sensor_modbus').setAttribute("checked", true);
		display_sensor_setting("sensor_modbus_setting");
	}
}

function display_selected_value(item, opt) {
	for (var [k,v] of Object.values(item.options).entries()) {
		if (v.value.toString() == opt) {
			v.selected = true;
		}
	}
}