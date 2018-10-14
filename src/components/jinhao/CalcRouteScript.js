import React from 'react'

/**
 * 金颢需要的一个字符替换的工具类
 */
class FormTest extends React.Component {
    constructor(props) {
        super(props);
        this.calcRouteScript = this.calcRouteScript.bind(this);
        this.state = {
            viewStr: ''
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
                                <input id='type' placeholder='type' defaultValue='31' onChange={this.calcRouteScript} ref={(type) => {
                                    this.type = type
                                }}/>
                            </div>
                        </div>
                    </form>
                </div>

                <div>
                    <textarea className="form-control" rows='30' value={this.state.viewStr}></textarea>
                </div>
            </div>
        )
    }


    calcRouteScript() {
        if (this.prefix.value == '' || this.slots.value == '' || this.port.value == '' || this.ont.value == '' || this.passwordAuth.value == '' || this.type.value == '') {
            return;
        }
        var v_prefix = +this.prefix.value;
        var v_slots = +this.slots.value;
        var v_port = +this.port.value;
        var v_ont = +this.ont.value;
        var v_passwordAuth = +this.passwordAuth.value;
        var v_type = +this.type.value;


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


        rawStr = rawStr.replace(new RegExp("#PORT#", 'g'), v_port);
        rawStr = rawStr.replace(new RegExp("#PASSWORD-AUTH#", 'g'), v_passwordAuth);
        rawStr = rawStr.replace(new RegExp("#ONT#", 'g'), v_ont);
        rawStr = rawStr.replace(new RegExp("#ONT-TYPE#", 'g'), v_ont + v_type);
        rawStr = rawStr.replace(new RegExp("#PREFIX/SLOT/PORT#", 'g'), v_prefix + '/' + v_slots + '/' + v_port);
        rawStr = rawStr.replace(new RegExp("#VLAN#", 'g'), (v_type + (v_slots - 1) * 16) + v_port);
        rawStr = rawStr.replace(new RegExp("#VLAN1000#", 'g'), (v_type + (v_slots - 1) * 16) + v_port + 1000);
        rawStr = rawStr.replace(new RegExp("#PREFIX-SLOT#", 'g'), "" + v_prefix + "/" + v_slots);
        rawStr = rawStr.replace(new RegExp("#CRLF#", 'g'), "\n");

        console.log(rawStr);

        this.setState({
            viewStr: rawStr
        })
    }
}

export default FormTest