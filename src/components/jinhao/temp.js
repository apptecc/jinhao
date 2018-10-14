var rawStr = "display ont info 0 1 1 all     /查看PON口下设备数量\n" +
    "\n" +
    "======================\n" +
    "密码方式认证\n" +
    "\n" +
    "interface gpon #PREFIX-SLOT#\n" +
    "\n" +
    "ont add #PORT# #ONT# password-auth \"#PASSWORD-AUTH#\"  always-on omci ont-lineprofile-name FTTH-24M-100M ont-srvprofile-name FTTH_1\n" +
    "\n" +
    "ont alarm-policy #PORT# #ONT#  \t policy-id 1\n" +
    "\n" +
    "quit\n" +
    "\n" +
    "service-port  vlan #VLAN#  port #PREFIX/SLOT/PORT# ont #ONT# multi-service user-vlan #ONT-TYPE#   tag-transform translate-and-add inner-vlan #ONT-TYPE#   inbound traffic-table index 7 outbound traffic-table index 7\n" +
    "service-port  vlan #VLAN1000# port #PREFIX/SLOT/PORT# ont #ONT# multi-service user-vlan 2030 tag-transform translate-and-add inner-vlan 2030 inbound traffic-table index 7 outbound traffic-table index 7\n" +
    "service-port  vlan 3033 port #PREFIX/SLOT/PORT# ont #ONT# multi-service user-vlan 3033 tag-transform translate inbound traffic-table index 7 outbound traffic-table index 7\n" +
    "service-port  vlan 3951 port #PREFIX/SLOT/PORT# ont #ONT# multi-service user-vlan 3951 tag-transform translate inbound traffic-table index 7 outbound traffic-table index 7\n" +
    "service-port  vlan 4015 port #PREFIX/SLOT/PORT# ont #ONT# multi-service user-vlan 4015 tag-transform translate inbound traffic-table index 7 outbound traffic-table index 7";

var args = process.argv.splice(2)

function do_substitute() {
    var prefix = +args[0].split("/")[0];
    var slot = +args[0].split("/")[1];
    var port = +args[0].split("/")[2];

    var ont = +args[1];
    var passwordAuth = args[2];
    var type = +args[3];


    console.log("==================输入==================")
    console.log("prefix:", prefix, "slot:", slot, "port:", port, "ont:", ont, "passwordAuth:", passwordAuth, "type:", type)

    //substitute
    rawStr = rawStr.replace(new RegExp("#PORT#", 'g'), port)
    rawStr = rawStr.replace(new RegExp("#PASSWORD-AUTH#",'g'), passwordAuth)
    rawStr = rawStr.replace(new RegExp("#ONT#",'g'), ont)
    rawStr = rawStr.replace(new RegExp("#ONT-TYPE#",'g'), ont + type)
    rawStr = rawStr.replace(new RegExp("#PREFIX/SLOT/PORT#",'g'), args[0])
    rawStr = rawStr.replace(new RegExp("#VLAN#",'g'), (type + (slot - 1) * 16) + port)
    rawStr = rawStr.replace(new RegExp("#VLAN1000#",'g'), (type + (slot - 1) * 16) + port + 1000)
    rawStr = rawStr.replace(new RegExp("#PREFIX-SLOT#",'g'), "" + prefix + "/" + slot)
    rawStr = rawStr.replace(new RegExp("#CRLF#",'g'), "\n")

    console.log("==================输出==================\n\n\n\n\n\n\n\n")
    console.log(rawStr)
}

if(args.length != 4) {
    console.log("参数:\n 1)前缀/槽位/端口 2)VLAN口 3)密码 4)类型(华为31, 阿尔卡特跟中兴30) \n例:\nnode text-format.js 0/13/12 20 8351271050 31")
} else {
    do_substitute();
}



