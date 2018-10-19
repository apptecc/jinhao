import React from 'react'

/**
 * 金颢需要的一个字符替换的工具类
 */
class FormTest extends React.Component {
    constructor(props) {
        super(props);
        this.calcRouteScript = this.calcRouteScript.bind(this);
        this.typeClick = this.typeClick.bind(this);
        this.typeKeyDown = this.typeKeyDown.bind(this);
        this.state = {
            viewStr: '',
            huawei_style: 'btn btn-outline-info active',
            zte_style: 'btn btn-outline-info',
            pwSnHidden: true,
            def_type: '31'
        }
    }

    render() {
        return (
            <div className='container'>
                <div>
                    <form className="form-control-lg" role="form">
                        <div className="form-group">
                            <label htmlFor="prefix" className="col-sm-2 control-label">prefix</label>
                            <div className="col-sm-10">
                                <input id='prefix' placeholder='prefix' defaultValue='0' onChange={this.calcRouteScript} ref={(prefix) => {
                                    this.prefix = prefix
                                }}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="slots" className="col-sm-2 control-label">slots</label>
                            <div className="col-sm-10">
                                <input id='slots' placeholder='slots' defaultValue='13' onChange={this.calcRouteScript} ref={(slots) => {
                                    this.slots = slots
                                }}/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="port" className="col-sm-2 control-label">port</label>
                            <div className="col-sm-10">
                                <input id='port' placeholder='port' defaultValue='12' onChange={this.calcRouteScript} ref={(port) => {
                                    this.port = port
                                }}/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="ont" className="col-sm-2 control-label">ont</label>
                            <div className="col-sm-10">
                                <input id='ont' placeholder='ont' defaultValue='20' onChange={this.calcRouteScript} ref={(ont) => {
                                    this.ont = ont
                                }}/>
                            </div>
                        </div>

                        <div className="form-group" hidden={this.state.pwSnHidden}>
                            <label htmlFor="pwSn" className="col-sm-2 control-label">PW/SN</label>
                            <div className="col-sm-10">
                                <input id='pwSn' placeholder='pwSn' defaultValue='pw' onChange={this.calcRouteScript} ref={(pwSn) => {
                                    this.pwSn = pwSn
                                }}/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="passwordAuth" className="col-sm-2 control-label">passwordAuth</label>
                            <div className="col-sm-10">
                                <input id='passwordAuth' placeholder='passwordAuth' defaultValue='' onChange={this.calcRouteScript} ref={(passwordAuth) => {
                                    this.passwordAuth = passwordAuth
                                }}/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="type" className="col-sm-2 control-label">type</label>
                            <div className="col-sm-10">
                                <input id='type' placeholder='type' value={this.state.def_type} onChange={this.typeKeyDown} ref={(type) => {
                                    this.type = type
                                }}/>
                            </div>
                        </div>

                        <p>
                            <div className="btn-group-lg" data-toggle="buttons-radio">
                                <button className={this.state.huawei_style} id="type_huawei" onClick={this.typeClick} ref={(type_huawei) => {
                                    this.type_huawei = type_huawei
                                }}>HUAWEI
                                </button>
                                <button className={this.state.zte_style} id="type_zte" onClick={this.typeClick} ref={(type_zte) => {
                                    this.type_zte = type_zte
                                }}>ZTE
                                </button>
                            </div>
                        </p>
                    </form>
                </div>

                <div className="col-lg" style={{marginTop: 20 + 'em'}}>
                    <textarea className="form-control" rows='30' value={this.state.viewStr}></textarea>
                </div>
            </div>
        )
    }


    calcRouteScript() {
        let huaweiFlag = true;
        if (this.state.zte_style.endsWith("active")) {
            huaweiFlag = false;
        }

        if (this.prefix.value == '' || this.slots.value == '' || this.port.value == '' || this.ont.value == '' || this.passwordAuth.value == '' || this.type.value == '') {
            return;
        }
        let v_prefix = +this.prefix.value;
        let v_slots = +this.slots.value;
        let v_port = +this.port.value;
        let v_ont = +this.ont.value;
        let v_passwordAuth = this.passwordAuth.value;
        let v_type = +this.type.value;
        let v_pwSn = this.pwSn.value;


        var resultStr;

        if (huaweiFlag) {
            let rawStr = "display ont info 0 1 1 all     /查看PON口下设备数量\n" +
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

            rawStr = rawStr.replace(new RegExp("#PORT#", 'g'), v_port);
            rawStr = rawStr.replace(new RegExp("#PASSWORD-AUTH#", 'g'), v_passwordAuth);
            rawStr = rawStr.replace(new RegExp("#ONT#", 'g'), v_ont);
            rawStr = rawStr.replace(new RegExp("#ONT-TYPE#", 'g'), v_ont + v_type);
            rawStr = rawStr.replace(new RegExp("#PREFIX/SLOT/PORT#", 'g'), v_prefix + '/' + v_slots + '/' + v_port);
            rawStr = rawStr.replace(new RegExp("#VLAN#", 'g'), (v_type + (v_slots - 1) * 16) + v_port);
            rawStr = rawStr.replace(new RegExp("#VLAN1000#", 'g'), (v_type + (v_slots - 1) * 16) + v_port + 1000);
            rawStr = rawStr.replace(new RegExp("#PREFIX-SLOT#", 'g'), "" + v_prefix + "/" + v_slots);
            rawStr = rawStr.replace(new RegExp("#CRLF#", 'g'), "\n");
            resultStr = rawStr;
        } else {
            let rawStr = "configure terminal\n" +
                "interface gpon-olt_#PREFIX#/#SLOT#/#PORT#\n" +
                "onu #ONT# type  GH4FE1POTS #AUTH_TYPE#  #PASSWORD-AUTH#\t\n" +
                "exit\n" +
                "interface gpon-onu_1/2/1:44\n" +
                "sn-bind disable\n" +
                "tcont 1 name Tl1DefaultCreate profile UP20M\n" +
                "gemport 1 name Tl1DefaultCreate unicast tcont 1 dir both\n" +
                "switchport mode hybrid vport 1\n" +
                "service-port 1 vport 1 user-vlan #ONT_30# vlan #ONT_30# svlan #SLOT_30# \n" +
                "service-port 2 vport 1 user-vlan 2030 vlan 2030 svlan #SLOT_1030# \n" +
                "service-port 3 vport 1 user-vlan 3033 vlan 3033 \n" +
                "service-port 4 vport 1 user-vlan 3951 vlan 3951 \n" +
                "service-port 5 vport 1 user-vlan 4015 vlan 4015 \n" +
                "pppoe-plus enable vport 1 \n" +
                "pppoe-plus trust true replace vport 1 \n" +
                "exit\n" +
                "pon-onu-mng gpon-onu_#PREFIX#/#SLOT#/#PORT#:#ONT#\n" +
                "service Tl1DefaultCreate gemport 1\n" +
                "End\n" +
                "\n";


            rawStr = rawStr.replace(new RegExp("#PREFIX#", 'g'), v_prefix);
            rawStr = rawStr.replace(new RegExp("#SLOT#", 'g'), v_slots);
            rawStr = rawStr.replace(new RegExp("#PORT#", 'g'), v_port);

            rawStr = rawStr.replace(new RegExp("#PASSWORD-AUTH#", 'g'), v_passwordAuth);
            rawStr = rawStr.replace(new RegExp("#AUTH_TYPE#", 'g'), v_pwSn);
            rawStr = rawStr.replace(new RegExp("#ONT_30#", 'g'), v_ont + 30);

            rawStr = rawStr.replace(new RegExp("#ONT#", 'g'), v_ont);
            rawStr = rawStr.replace(new RegExp("#ONT-TYPE#", 'g'), v_ont + v_type);

            rawStr = rawStr.replace(new RegExp("#SLOT_30#", 'g'), (v_type + (v_slots - 1) * 16) + v_port);
            rawStr = rawStr.replace(new RegExp("#SLOT_1030#", 'g'), (v_type + (v_slots - 1) * 16) + v_port + 1000);
            rawStr = rawStr.replace(new RegExp("#CRLF#", 'g'), "\n");

            resultStr = rawStr;
        }

        this.setState({
            viewStr: resultStr
        })
    }

    typeClick(event) {
        if (event.target.id === 'type_huawei') {
            this.setState({
                huawei_style: 'btn btn-outline-info active',
                zte_style: 'btn btn-outline-info',
                pwSnHidden: true,
                def_type: '31'
            });
        } else if (event.target.id === 'type_zte') {
            this.setState({
                huawei_style: 'btn btn-outline-info',
                zte_style: 'btn btn-outline-info active',
                pwSnHidden: false,
                def_type: '30'
            });
        }
    }

    typeKeyDown(event) {
        console.log(event.target.value)
        this.setState({
            def_type: event.target.value
        });
        this.calcRouteScript();
    }
}

export default FormTest