import React, { Component } from 'react';

export class Lock extends Component {
    constructor() {
        super();
        this.state = {
            sources: [],
        };
    }

    componentDidMount() {
        eval(`
            document.addEventListener("DOMContentLoaded", function(event) {
            function OTPInput() {
                const inputs = document.querySelectorAll("#otp > *[id]");
                for (let i = 0; i < inputs.length; i++) {
                    inputs[i].addEventListener("keydown", function(event) {
                        if (event.key === "Backspace") {
                            inputs[i].value = "";
                            if (i !== 0) inputs[i - 1].focus();
                        } else {
                            if (i === inputs.length - 1 && inputs[i].value !== "") {
                                return true;
                            } else if (event.keyCode > 47 && event.keyCode < 58) {
                                inputs[i].value = event.key;
                                if (i !== inputs.length - 1) inputs[i + 1].focus();
                                event.preventDefault();
                            } else if (event.keyCode > 64 && event.keyCode < 91) {
                                inputs[i].value = String.fromCharCode(event.keyCode);
                                if (i !== inputs.length - 1) inputs[i + 1].focus();
                                event.preventDefault();
                            }
                        }
                    });
                }
            }
            OTPInput();
        });
        `)
    }

    render() {
        return <>
            <main className="auth-minimal-wrapper">
                <div className="auth-minimal-inner">
                    <div className="minimal-card-wrapper">
                        <div className="card mb-4 mt-5 mx-4 mx-sm-0 position-relative">
                            <div className="wd-50 bg-white p-2 rounded-circle shadow-lg position-absolute translate-middle top-0 start-50">
                                <img src="./assets/images/logo-abbr.png" alt="" className="img-fluid" />
                            </div>
                            <div className="card-body p-sm-5" style={{paddingBottom: "0px !important"}}>
                                <h2 className="fs-20 fw-bolder mb-4">Unlock</h2>
                                <h4 className="fs-13 fw-bold mb-2">Please enter the code in order to access all settings</h4>
                                <p className="fs-12 fw-medium text-muted">
                                    <span>Don't know the code? Please contact your administrator.</span>
                                </p>
                                <form action="/dashboard" className="w-100 mt-4 pt-2">
                                    <div id="otp" className="inputs d-flex flex-row justify-content-center mt-2">
                                        <input className="m-2 text-center form-control rounded" type="text" id="first" maxLength="1" required />
                                        <input className="m-2 text-center form-control rounded" type="text" id="second" maxLength="1" required />
                                        <input className="m-2 text-center form-control rounded" type="text" id="third" maxLength="1" required />
                                        <input className="m-2 text-center form-control rounded" type="text" id="fourth" maxLength="1" required />
                                        <input className="m-2 text-center form-control rounded" type="text" id="fifth" maxLength="1" required />
                                        <input className="m-2 text-center form-control rounded" type="text" id="sixth" maxLength="1" required />
                                    </div>
                                    <div className="mt-5">
                                        <button type="submit" className="btn btn-lg btn-primary w-100">Unlock</button>
                                    </div>
                                </form>
                                <div className="text-center mt-4 text-muted">
                                    <p>Secure Backup Manager 24.4 | &copy; 2024 Pixel Shift.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="backup-status-widget p-4 mt-5 text-center bg-light rounded shadow">
                        <p className="fs-13 text-muted mb-2">Last Backup: <span className="fw-semibold">2 hours ago</span></p>
                        <div className="d-flex justify-content-center gap-3 mt-3">
                            <div>
                                <p className="fs-12 text-muted mb-1">Used Storage</p>
                                <h5 className="fw-bold text-dark mb-0">250 GB</h5>
                            </div>
                            <div>
                                <p className="fs-12 text-muted mb-1">Free Space</p>
                                <h5 className="fw-bold text-dark mb-0">500 GB</h5>
                            </div>
                            <div>
                                <p className="fs-12 text-muted mb-1">Snapshots</p>
                                <h5 className="fw-bold text-dark mb-0">124</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>

    }
}
