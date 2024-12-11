// import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Theme.css';
import './css/App.css';
import axios from 'axios';
import { React, Component } from 'react';
import { BrowserRouter as Router, NavLink, Redirect, Route, Switch } from 'react-router-dom';
import { Policy } from './pages/Policy';
import { Preferences } from './pages/Preferences';
import { Policies } from "./pages/Policies";
import { Repository } from "./pages/Repository";
import { Task } from './pages/Task';
import { Tasks } from './pages/Tasks';
import { Snapshots } from "./pages/Snapshots";
import { Dashboard } from "./pages/Dashboard";
import { SnapshotCreate } from './pages/SnapshotCreate';
import { SnapshotDirectory } from "./pages/SnapshotDirectory";
import { SnapshotHistory } from "./pages/SnapshotHistory";
import { SnapshotRestore } from './pages/SnapshotRestore';
import { Lock } from './pages/Lock';
import { AppContext } from './contexts/AppContext';
import { UIPreferenceProvider } from './contexts/UIPreferencesContext';
export default class App extends Component {
  constructor() {
    super();

    this.state = {
      runningTaskCount: 0,
      isFetching: false,
      repoDescription: "",
      isRepositoryConnected: false,
    };

    this.fetchTaskSummary = this.fetchTaskSummary.bind(this);
    this.repositoryUpdated = this.repositoryUpdated.bind(this);
    this.repositoryDescriptionUpdated = this.repositoryDescriptionUpdated.bind(this);
    this.fetchInitialRepositoryDescription = this.fetchInitialRepositoryDescription.bind(this);

    const tok = document.head.querySelector('meta[name="kopia-csrf-token"]');
    if (tok && tok.content) {
      axios.defaults.headers.common['X-Kopia-Csrf-Token'] = tok.content;
    } else {
      axios.defaults.headers.common['X-Kopia-Csrf-Token'] = "-";
    }
  }

  componentDidMount() {
    const av = document.getElementById('appVersion');
    if (av) {
      // show app version after mounting the component to avoid flashing of unstyled content.
      av.style.display = "block";
    }

    this.fetchInitialRepositoryDescription();
    this.taskSummaryInterval = window.setInterval(this.fetchTaskSummary, 5000);
  }

  fetchInitialRepositoryDescription() {
    axios.get('/api/v1/repo/status').then(result => {
      if (result.data.description) {
        this.setState({
          repoDescription: result.data.description,
          isRepositoryConnected: result.data.connected
        });
      }
    }).catch(error => { /* ignore */ });
  }

  fetchTaskSummary() {
    if (!this.state.isFetching) {
      this.setState({ isFetching: true });
      axios.get('/api/v1/tasks-summary').then(result => {
        this.setState({ isFetching: false, runningTaskCount: result.data["RUNNING"] || 0 });
      }).catch(error => {
        this.setState({ isFetching: false, runningTaskCount: -1 });
      });
    }
  }

  componentWillUnmount() {
    window.clearInterval(this.taskSummaryInterval);
  }

  // this is invoked via AppContext whenever repository is connected, disconnected, etc.
  repositoryUpdated(isConnected) {
    this.setState({ isRepositoryConnected: isConnected })
    if (isConnected) {
      window.location.replace("/snapshots");
    } else {
      window.location.replace("/repo");
    }
  }

  repositoryDescriptionUpdated(desc) {
    this.setState({
      repoDescription: desc,
    });
  }

  render() {
    const { uiPrefs, runningTaskCount, isRepositoryConnected } = this.state;

    return (
      <Router>
        <AppContext.Provider value={this}>
          <UIPreferenceProvider initalValue={uiPrefs}>
              <Switch>
                  <Route path="/dashboard" render={({ match: { path } }) => (
                    <>
                      <nav className="nxl-navigation">
                        <div className="navbar-wrapper">
                          <div className="m-header">
                            <NavLink to="/dashboard">
                              <img src="/assets/images/logo-full.png" alt="" className="logo logo-lg" width="200px" />
                              <img src="/assets/images/logo-abbr.png" alt="" className="logo logo-sm" />
                            </NavLink>
                          </div>
                          <div className="navbar-content">
                            <ul className="nxl-navbar">
                              <li className="nxl-item nxl-caption">
                                <label>Navigation</label>
                              </li>
                              <li className="nxl-item">
                                <NavLink to="/dashboard" className="nxl-link text-decoration-none">
                                  <span className="nxl-micon"><i className="feather-home"></i></span>
                                  <span className="nxl-mtext">Dashboard</span><span className="nxl-arrow"></span>
                                </NavLink>
                              </li>
                              <li className="nxl-item nxl-hasmenu">
                                <div className="nxl-link">
                                  <span className="nxl-micon"><i className="feather-database"></i></span>
                                  <span className="nxl-mtext">Backup Settings</span><span className="nxl-arrow"><i className="feather-chevron-right"></i></span>
                                </div>
                                <ul className="nxl-submenu">
                                  <li className="nxl-item">
                                    <NavLink data-testid="tab-snapshots" title="" data-title="Snapshots" className={isRepositoryConnected ? "nav-link nxl-link" : "nav-link disabled nxl-link"} to="/dashboard/snapshots">Snapshots</NavLink>
                                  </li>
                                  <li className="nxl-item">
                                    <NavLink data-testid="tab-tasks" title="" data-title="Tasks" className={isRepositoryConnected ? "nav-link nxl-link" : "nav-link disabled nxl-link"} to="/dashboard/tasks">Tasks
                                      <>{runningTaskCount > 0 && <>({runningTaskCount})</>}</>
                                    </NavLink>
                                  </li>
                                  <li className="nxl-item">
                                    <NavLink data-testid="tab-policies" title="" data-title="Policies" className={isRepositoryConnected ? "nav-link nxl-link" : "nav-link disabled nxl-link"} to="/dashboard/policies">Policies</NavLink>
                                  </li>
                                </ul>
                              </li>
                              <li className="nxl-item">
                                <NavLink to="/dashboard/history" className="nxl-link text-decoration-none">
                                  <span className="nxl-micon"><i className="feather-clock"></i></span>
                                  <span className="nxl-mtext">History</span><span className="nxl-arrow"></span>
                                </NavLink>
                              </li>
                              <li className="nxl-item">
                                <NavLink to="/dashboard/preferences" className="nxl-link text-decoration-none">
                                  <span className="nxl-micon"><i className="feather-settings"></i></span>
                                  <span className="nxl-mtext">Settings</span><i className="nxl-arrow"></i>
                                </NavLink>
                              </li>
                            </ul>
                            <div className="card text-center">
                              <div className="card-body">
                                <i className="feather-sunrise fs-4 text-dark"></i>
                                <h6 className="mt-4 text-dark fw-bolder">Pixel Shift</h6>
                                <p className="fs-11 my-3 text-dark">Pixel Shift offers robust IT Service Solutions. Our services are available around the clock.</p>
                                <a href="https://pixel-shift.de" className="btn btn-primary text-dark w-100">Read More...</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </nav>
                      <header className="nxl-header top-0">
                        <div className="header-wrapper">
                          <div className="header-left d-flex align-items-center gap-4">
                            <a href="#" className="nxl-head-mobile-toggler text-decoration-none" id="mobile-collapse">
                              <div className="hamburger hamburger--arrowturn">
                                <div className="hamburger-box">
                                  <div className="hamburger-inner"></div>
                                </div>
                              </div>
                            </a>
                            <div className="nxl-navigation-toggle">
                              <a href="#" id="menu-mini-button" className="text-decoration-none">
                                <i className="feather-align-left"></i>
                              </a>
                              <a href="#" id="menu-expend-button" style={{ display: 'none' }} className="text-decoration-none">
                                <i className="feather-arrow-right"></i>
                              </a>
                            </div>
                            <div className="nxl-lavel-mega-menu-toggle d-flex d-lg-none">
                              <a href="#" id="nxl-lavel-mega-menu-open">
                                <i className="feather-align-left"></i>
                              </a>
                            </div>
                          </div>
                          <div className="header-right ms-auto">
                            <div className="d-flex align-items-center">
                              <div className="dropdown nxl-h-item nxl-header-language d-none d-sm-flex">
                                <a href="#" className="nxl-head-link me-0 nxl-language-link text-decoration-none" data-bs-toggle="dropdown" data-bs-auto-close="outside">
                                  <img src="/assets/vendors/img/flags/4x3/us.svg" alt="" className="img-fluid wd-20" />
                                </a>
                                <div className="dropdown-menu dropdown-menu-end nxl-h-dropdown nxl-language-dropdown">
                                  <div className="dropdown-divider mt-0"></div>
                                  <div className="language-items-wrapper">
                                    <div className="select-language px-4 py-2 hstack justify-content-between gap-4">
                                      <div className="lh-lg">
                                        <h6 className="mb-0">Select Language</h6>
                                        <p className="fs-11 text-muted mb-0">2 languages avaiable!</p>
                                      </div>
                                    </div>
                                    <div className="dropdown-divider"></div>
                                    <div className="row px-4 pt-3">
                                      <div className="col-sm-4 col-6 language_select active">
                                        <a href="#" className="d-flex align-items-center gap-2 text-decoration-none">
                                          <div className="avatar-image avatar-sm"><img src="/assets/vendors/img/flags/1x1/us.svg" alt="" className="img-fluid" /></div>
                                          <span>English</span>
                                        </a>
                                      </div>
                                      <div className="col-sm-4 col-6 language_select">
                                        <a href="#" className="d-flex align-items-center gap-2 text-decoration-none">
                                          <div className="avatar-image avatar-sm"><img src="/assets/vendors/img/flags/1x1/de.svg" alt="" className="img-fluid" /></div>
                                          <span>German</span>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="nxl-h-item dark-light-theme">
                                <a href="#" className="nxl-head-link me-0 dark-button text-decoration-none">
                                  <i className="feather-moon"></i>
                                </a>
                                <a href="#" className="nxl-head-link me-0 light-button text-decoration-none" style={{ display: 'none' }}>
                                  <i className="feather-sun"></i>
                                </a>
                              </div>
                              <div className="dropdown nxl-h-item">
                                <a className="nxl-head-link me-0 text-decoration-none" data-bs-toggle="dropdown" href="#" role="button" data-bs-auto-close="outside">
                                  <i className="feather-bell"></i>
                                  <span className="badge bg-danger nxl-h-badge">3</span>
                                </a>
                                <div className="dropdown-menu dropdown-menu-end nxl-h-dropdown nxl-notifications-menu">
                                  <div className="d-flex justify-content-between align-items-center notifications-head">
                                    <h6 className="fw-bold text-dark mb-0">Job History</h6>
                                  </div>
                                  <div className="notifications-item">
                                    <div className="notifications-desc">
                                      <a href="#" className="font-body text-truncate-2-line text-decoration-none"> Repository maintenance successful</a>
                                      <div className="d-flex justify-content-between align-items-center">
                                        <div className="notifications-date text-muted border-bottom border-bottom-dashed">2 minutes ago</div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="notifications-item">
                                    <div className="notifications-desc">
                                      <a href="#" className="font-body text-truncate-2-line">Backup task completed</a>
                                      <div className="d-flex justify-content-between align-items-center">
                                        <div className="notifications-date text-muted border-bottom border-bottom-dashed">36 minutes ago</div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="notifications-item">
                                    <div className="notifications-desc">
                                      <a href="#" className="font-body text-truncate-2-line text-decoration-none"> Repository not available. Retrying...</a>
                                      <div className="d-flex justify-content-between align-items-center">
                                        <div className="notifications-date text-muted border-bottom border-bottom-dashed">53 minutes ago</div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="text-center notifications-footer">
                                    <a href="#" className="fs-13 fw-semibold text-dark">See full history...</a>
                                  </div>
                                </div>
                              </div>
                              <div className="nxl-h-item">
                                <a href="/auth/locked" className="nxl-head-link me-0 text-decoration-none">
                                  <i className="feather-lock"></i>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </header>

                      <main  className="nxl-container">
                        <Switch>
                          <Route path={`${path}`} exact component={Dashboard} />
                          <Route path={`${path}/snapshots/new`} component={SnapshotCreate} />
                          <Route path={`${path}/snapshots/single-source/`} component={SnapshotHistory} />
                          <Route path={`${path}/snapshots/dir/:oid/restore`} component={SnapshotRestore} />
                          <Route path={`${path}/snapshots/dir/:oid`} component={SnapshotDirectory} />
                          <Route path={`${path}/snapshots`} component={Snapshots} />
                          <Route path={`${path}/policies/edit/`} component={Policy} />
                          <Route path={`${path}/policies`} component={Policies} />
                          <Route path={`${path}/tasks/:tid`} component={Task} />
                          <Route path={`${path}/tasks`} component={Tasks} />
                          <Route path={`${path}/repo`} component={Repository} />
                          <Route path={`${path}/preferences`} component={Preferences} />
                        </Switch>
                      </main>
                    </>
                  )} />
                  <Route
                    path="/auth"
                    render={({ match: { path } }) => (
                      <Switch>
                        <Route exact path={`${path}/locked`} component={Lock} />
                      </Switch>
                    )}
                  />
                  <Route exact path="/">
                    <Redirect to="/dashboard/dashboard" />
                  </Route>
              </Switch>
              <footer className="footer">
                <p className="fs-11 text-muted fw-medium text-uppercase mb-0 copyright">
                  <span>Copyright ©</span>
                  <script>
                    document.write(new Date().getFullYear());
                  </script> Pixel Shift. All rights reserved.
                </p>
                <div className="d-flex align-items-center gap-4">
                  <a href="https://pixel-shift.de/contact" className="fs-11 fw-semibold text-uppercase">Help</a>
                  <a href="https://pixel-shift.de/agb" className="fs-11 fw-semibold text-uppercase">Terms</a>
                  <a href="https://pixel-shift.de/privacy" className="fs-11 fw-semibold text-uppercase">Privacy</a>
                </div>
              </footer>
          </UIPreferenceProvider>
        </AppContext.Provider>
      </Router>
    );
  }
}
