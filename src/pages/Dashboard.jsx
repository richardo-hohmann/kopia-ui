import React, { Component } from 'react';
import { UIPreferencesContext } from '../contexts/UIPreferencesContext';

export class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            sources: [],
        };
    }

    componentDidMount() {
    }

    render() {
        return <div className="nxl-content">
            <div className="main-content">
                <div className="row">
                    <div className="col-xxl-3 col-md-6">
                        <div className="card stretch stretch-full">
                            <div className="card-body">
                                <div className="d-flex align-items-start justify-content-between mb-4">
                                    <div className="d-flex gap-4 align-items-center">
                                        <div className="avatar-text avatar-lg bg-gray-200">
                                            <i className="feather-cloud"></i>
                                        </div>
                                        <div>
                                            <div className="fs-4 fw-bold text-dark"><span className="counter">12</span>/<span
                                                className="counter">15</span></div>
                                            <h3 className="fs-13 fw-semibold text-truncate-1-line">Tasks Completed</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-4">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <a href="#"
                                            className="fs-12 fw-medium text-muted text-truncate-1-line">Active Backups</a>
                                        <div className="w-100 text-end">
                                            <span className="fs-11 text-muted">(80%)</span>
                                        </div>
                                    </div>
                                    <div className="progress mt-2 ht-3">
                                        <div className="progress-bar bg-primary" role="progressbar" style={{ width: '80%' }}>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xxl-3 col-md-6">
                        <div className="card stretch stretch-full">
                            <div className="card-body">
                                <div className="d-flex align-items-start justify-content-between mb-4">
                                    <div className="d-flex gap-4 align-items-center">
                                        <div className="avatar-text avatar-lg bg-gray-200">
                                            <i className="feather-database"></i>
                                        </div>
                                        <div>
                                            <div className="fs-4 fw-bold text-dark"><span className="counter">320</span>GB</div>
                                            <h3 className="fs-13 fw-semibold text-truncate-1-line">Storage used</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-4">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <a href="#"
                                            className="fs-12 fw-medium text-muted text-truncate-1-line">Available
                                            Storage</a>
                                        <div className="w-100 text-end">
                                            <span className="fs-11 text-muted">(64%)</span>
                                        </div>
                                    </div>
                                    <div className="progress mt-2 ht-3">
                                        <div className="progress-bar bg-warning" role="progressbar" style={{ width: "64%" }}>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xxl-3 col-md-6">
                        <div className="card stretch stretch-full">
                            <div className="card-body">
                                <div className="d-flex align-items-start justify-content-between mb-4">
                                    <div className="d-flex gap-4 align-items-center">
                                        <div className="avatar-text avatar-lg bg-gray-200">
                                            <i className="feather-layers"></i>
                                        </div>
                                        <div>
                                            <div className="fs-4 fw-bold text-dark"><span className="counter">120</span></div>
                                            <h3 className="fs-13 fw-semibold text-truncate-1-line">Snapshots Created</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-4">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <a href="#"
                                            className="fs-12 fw-medium text-muted text-truncate-1-line">Progress</a>
                                        <div className="w-100 text-end">
                                            <span className="fs-11 text-muted">(80%)</span>
                                        </div>
                                    </div>
                                    <div className="progress mt-2 ht-3">
                                        <div className="progress-bar bg-success" role="progressbar" style={{ width: "80%" }}>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xxl-3 col-md-6">
                        <div className="card stretch stretch-full">
                            <div className="card-body">
                                <div className="d-flex align-items-start justify-content-between mb-4">
                                    <div className="d-flex gap-4 align-items-center">
                                        <div className="avatar-text avatar-lg bg-gray-200">
                                            <i className="feather-shield"></i>
                                        </div>
                                        <div>
                                            <div className="fs-4 fw-bold text-dark"><span className="counter">95</span>%</div>
                                            <h3 className="fs-13 fw-semibold text-truncate-1-line">Repository Health</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-4">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <a href="#"
                                            className="fs-12 fw-medium text-muted text-truncate-1-line">Health Status</a>
                                        <div className="w-100 text-end">
                                            <span className="fs-11 text-muted">(95%)</span>
                                        </div>
                                    </div>
                                    <div className="progress mt-2 ht-3">
                                        <div className="progress-bar bg-danger" role="progressbar" style={{ width: "95%" }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xxl-8">
                        <div className="card stretch stretch-full">
                            <div className="card-header">
                                <h5 className="card-title">Storage Statistics</h5>
                                <div className="card-header-action">
                                    <div className="card-header-btn">
                                        <div data-bs-toggle="tooltip" title="Refresh">
                                            <a href="#" className="avatar-text avatar-xs bg-warning"
                                                data-bs-toggle="refresh"></a>
                                        </div>
                                        <div data-bs-toggle="tooltip" title="Maximize/Minimize">
                                            <a href="#" className="avatar-text avatar-xs bg-success"
                                                data-bs-toggle="expand"></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body custom-card-action p-0">
                                <div id="storage-chart"></div>
                            </div>
                            <div className="card-footer">
                                <div className="row g-4">
                                    <div className="col-lg-3">
                                        <div className="p-3 border border-dashed rounded">
                                            <div className="fs-12 text-muted mb-1">Used Storage</div>
                                            <h6 className="fw-bold text-dark">250 GB</h6>
                                            <div className="progress mt-2 ht-3">
                                                <div className="progress-bar bg-danger" role="progressbar"
                                                    style={{ width: "68%" }}></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="p-3 border border-dashed rounded">
                                            <div className="fs-12 text-muted mb-1">Free Space</div>
                                            <h6 className="fw-bold text-dark">500 GB</h6>
                                            <div className="progress mt-2 ht-3">
                                                <div className="progress-bar bg-success" role="progressbar"
                                                    style={{ width: "32%" }}></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="p-3 border border-dashed rounded">
                                            <div className="fs-12 text-muted mb-1">Snapshots</div>
                                            <h6 className="fw-bold text-dark">124</h6>
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="p-3 border border-dashed rounded">
                                            <div className="fs-12 text-muted mb-1">Repository Size</div>
                                            <h6 className="fw-bold text-dark">750 GB</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xxl-4">
                        <div className="card stretch stretch-full overflow-hidden">
                            <div className="bg-primary text-white">
                                <div className="p-4">
                                    <span className="badge bg-light text-primary float-end">Running</span>
                                    <div className="text-start">
                                        <h4 className="text-reset">4 Active Tasks</h4>
                                        <p className="text-reset m-0">Backup Progress</p>
                                    </div>
                                </div>
                                <div id="backup-progress-chart"></div>
                            </div>
                            <div className="card-body">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div>
                                        <a href="#" className="d-block">Home Directory Backup</a>
                                        <span className="fs-12 text-muted">Progress: 80%</span>
                                    </div>
                                    <div>
                                        <div className="fw-bold text-dark">~20 mins</div>
                                    </div>
                                </div>
                                <hr className="border-dashed my-3" />
                                <div className="d-flex align-items-center justify-content-between">
                                    <div>
                                        <a href="#" className="d-block">Documents Sync</a>
                                        <span className="fs-12 text-muted">Progress: 65%</span>
                                    </div>
                                    <div>
                                        <div className="fw-bold text-dark">~15 mins</div>
                                    </div>
                                </div>
                            </div>
                            <a href="#"
                                className="card-footer fs-11 fw-bold text-uppercase text-center py-4">View All Tasks</a>
                        </div>
                    </div>


                </div>
            </div>
        </div>

    }
}
Dashboard.contextType = UIPreferencesContext
