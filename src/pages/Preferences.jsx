import { Component } from 'react';
import { UIPreferencesContext } from '../contexts/UIPreferencesContext';

/**
 * Class that exports preferences
 */
export class Preferences extends Component {
    render() {
        const { pageSize, theme, bytesStringBase2, fontSize, setByteStringBase, setTheme, setFontSize } = this.context;
        return <>
            <div className="nxl-content">
                <div className="main-content">
                    <div className="content-area-body">
                        <div className="card mb-5">
                            <div className="card-body">
                                <div className="mb-2">
                                    <h4 className="fw-bold">Secure Backup Settings</h4>
                                </div>
                                <div className="mt-5">
                                    <label className='label-description' htmlFor='themeSelector' id='themeLabel'><h5>Theme</h5></label>
                                    <select className="form-select" title='Select theme' id='themeSelector' value={theme} onChange={e => setTheme(e.target.value)}>
                                        <option value="light">light</option>
                                        <option value="dark">dark</option>
                                        <option value="pastel">pastel</option>
                                        <option value="ocean">ocean</option>
                                    </select>
                                    <small hmtlfor='themeLabel' id='themeHelp' className='form-text text-muted'>The current active theme</small>
                                </div>
                                <div className="mt-5">
                                    <label className='label-description' htmlFor="bytesBaseInput"><h5>Byte representation</h5></label>

                                    <select className="form-select" title='Select byte representation' id='bytesBaseInput' value={bytesStringBase2} onChange={e => setByteStringBase(e.target.value)} data-select2-selector="default">
                                        <option value="true">Base-2 (KiB, MiB, GiB, TiB)</option>
                                        <option value="false">Base-10 (KB, MB, GB, TB)</option>
                                    </select>
                                    <small hmtlfor='bytesBaseInput' id='bytesHelp' className='form-text text-muted'>Specifies the representation of bytes</small>
                                </div>
                                <div className="mt-5">
                                    <label className='label-description'><h5>Appearance</h5></label>

                                    <select className="form-select" title='Select font size' id='fontSizeInput' value={fontSize} onChange={e => setFontSize(e.target.value)}>
                                        <option value="fs-6">small</option>
                                        <option value="fs-5">medium</option>
                                        <option value="fs-4">large</option>
                                    </select>
                                    <small hmtlfor="fontSizeInput" id='fontSizeHelp' className='form-text text-muted'>Specifies the appearance of the user interface</small>
                                </div>
                                <div className="mt-5">
                                    <label className='label-description'><h5>Page Size</h5></label>

                                    <input className='form-control' id='pageSizeInput' type='text' placeholder='Page size' value={pageSize} disabled={true} data-select2-selector="default" />

                                    <small hmtlfor="pageSizeInput" id='pageSizeHelp' className='form-text text-muted'>Specifies the pagination size in tables</small>
                                </div>
                                <div className="mt-5">
                                    <h4>Lockdown Mode</h4>
                                    <select className="form-select" data-select2-selector="default">
                                        <option value="disabled">Disabled</option>
                                        <option value="enabled">Enabled</option>
                                    </select>
                                    <small className="form-text text-muted">Specifies the lockdown mode</small>
                                </div>
                                <div>
                                    <div id="otp" className="inputs d-flex flex-row justify-content-center mt-2">
                                        <input className="m-2 text-center form-control rounded" type="text" id="first" maxLength="1"
                                            required />
                                        <input className="m-2 text-center form-control rounded" type="text" id="second" maxLength="1"
                                            required />
                                        <input className="m-2 text-center form-control rounded" type="text" id="third" maxLength="1"
                                            required />
                                        <input className="m-2 text-center form-control rounded" type="text" id="fourth" maxLength="1"
                                            required />
                                        <input className="m-2 text-center form-control rounded" type="text" id="fifth" maxLength="1"
                                            required />
                                        <input className="m-2 text-center form-control rounded" type="text" id="sixth" maxLength="1"
                                            required />
                                    </div>
                                    <small className="form-text text-muted">Specifies the lockdown password</small>
                                    <button className="btn btn-primary mt-2">Save Password</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    }
}
Preferences.contextType = UIPreferencesContext
