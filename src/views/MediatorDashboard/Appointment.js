import React, { useCallback, useEffect, useState } from "react";

import { MediatorDashboardLayout } from "../../layouts";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { connect, useSelector } from "react-redux";
import { Modal } from "antd";
import moment from "moment";
const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const Appointments = ({ caseData }) => {
  const [caseDetail, setCaseDetail] = useState({});
  const [hearDetails, setHearDetails] = useState({});
  const [modal, setModal] = useState(false);
  const casehearing = caseData?.filter((cas) => cas?.hearings?.length !== 0);
  let obj = [];
  for (let j = 0; j < casehearing?.length; j++) {
    for (let i = 0; i < casehearing[j]?.hearings?.length; i++) {
      obj.push({
        case: casehearing[j],
        hearingId: casehearing[j]?.hearings[i]?._id,
        title: casehearing[j]?.hearings[i].case?.secondPartyDetails?.name,
        start: new Date(casehearing[j]?.hearings[i].startDateTime),
        end: new Date(casehearing[j]?.hearings[i]?.startDateTime),
      });
    }
  }
  const selectedHearong = () => {
    console.log(caseDetail, "details");
    const selectHear = caseDetail?.case?.hearings.find(
      (hear) => hear._id === caseDetail?.hearingId
    );
    return selectHear?.startDateTime;
  };
  console.log(hearDetails, "hearing details");
  return (
    <MediatorDashboardLayout>
      <div>
        <Calendar
          localizer={localizer}
          events={obj}
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={(e) => {
            setCaseDetail(e);
            setModal(!modal);
          }}
          style={{ height: 500 }}
        />
      </div>
      <Modal
        // title=
        visible={modal}
        onOk={() => setModal(!modal)}
        onCancel={() => setModal(!modal)}
      >
        <h2 className="modalHeader">{caseDetail.title}</h2>
        <p className="timing">
          {moment(selectedHearong()).format("ddd MMMM YYYY,")}
        </p>
        <p className="timing">{moment(selectedHearong()).format("HH:MM:SS")}</p>
        <div>
          <p className="meetingUrl">
            Meeting Url:&nbsp;&nbsp;
            {
              <a href={caseDetail?.case?.meetingUrl} target="_blank">
                {caseDetail?.case?.meetingUrl}
              </a>
            }
          </p>
          <h3>About Case</h3>
          <p className="caseType">
            Case Type:&nbsp;&nbsp;
            <span>{caseDetail?.case?.caseType?.name}</span>
          </p>
          <p className="lastUpdate">
            Description:&nbsp;&nbsp;
            <span>
              Anandi has filed against HDFC, claiming that the property
              valuation was underpriced and her loan approval should be
              consistent.
            </span>
          </p>
          <p className="lastUpdate">
            Last Update:&nbsp;&nbsp;
            <span>
              Initial evidence recording was done on Dec 16. Both parties have
              put their statements on record band cross questioning will be done
              in next meet.
            </span>
          </p>
          <h3>All Updates</h3>
          {caseDetail?.case?.caseUpdates.length > 0
            ? ""
            : "No Updates for this case"}
        </div>
      </Modal>
    </MediatorDashboardLayout>
  );
};

const mapstateToProps = (state) => {
  return {
    caseData: state.cases,
  };
};

export default connect(mapstateToProps)(Appointments);
