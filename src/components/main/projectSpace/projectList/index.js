import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import EMPTYPROJECT from "../../../../image/main_empty_project.png";
import { getMyClass, getMyTeam } from "../../../../actions";
import Project from "../project";

class ProjectList extends Component {
  componentDidMount() {
    const { token, auth } = this.props.user;
    if (auth) {
      this.props.getMyClass(token);
    } else {
      this.props.getMyTeam(token);
    }
  }
  renderClass() {
    const { user, onChangeClick } = this.props;
    let datas = 0;
    if (user.auth) {
      datas = this.props.class;
    } else {
      datas = this.props.team;
    }
    if (datas.length === 0 || datas.result === 0) {
      return (
        <div className="empty">
          <img
            src={EMPTYPROJECT}
            alt="empty project"
            width="360"
            height="360"
          />
          <p>진행중인 수업이 없습니다.</p>
          <p>
            {user.auth
              ? "프로젝트를 생성하고 학생들을 초대하세요!"
              : "생성된 프로젝트의 초대를 받으세요!"}
          </p>
        </div>
      );
    } else {
      return _.map(datas, data => {
        return (
          <Project
            key={data.cid}
            info={data}
            onChangeClick={next => onChangeClick(next)}
          />
        );
      });
    }
  }
  render() {
    return <div className="project_list">{this.renderClass()}</div>;
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    class: state.class,
    team: state.team
  };
}

export default connect(mapStateToProps, { getMyClass, getMyTeam })(ProjectList);
