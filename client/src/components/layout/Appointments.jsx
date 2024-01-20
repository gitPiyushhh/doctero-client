import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../ui/Header';
import Overview from '../ui/Overview';
import Transactions from '../ui/Transactions';
import {
  changeActiveTab,
  getAllAppointments,
  getAllRemoteAppointments,
} from '../../features/appointment';
import moment from 'moment/moment';

const tableHeadMetaData = [
  {
    name: 'Appointment ID',
  },
  {
    name: 'Patient ID',
  },
  {
    name: 'Name',
  },
  {
    name: 'Problem',
  },
  {
    name: 'Date',
  },
  {
    name: 'Type',
    rightAlign: true,
  },
];

const transformAppointment = (appointment) => {
  return {
    appointmentId: `#${
      appointment._id.slice(0, 4) +
      '...' +
      appointment._id.slice(-4, appointment._id.length)
    }`,
    patientId: `#${
      appointment.patient._id.slice(0, 4) +
      '...' +
      appointment.patient._id.slice(-4, appointment.patient._id.length)
    }`,
    name: appointment.patient.name,
    problem: `${
      appointment.notes.length ? appointment.notes : 'No problem spcified'
    }`,
    date: `${transformDate(appointment.date, appointment.startTime)}`,
    type: `${appointment.type}`,
  };
};

function transformDate(date, time) {
  const currentDate = new Date();

  const comparatorDate = new Date(date.split('T')[0]);

  return comparatorDate.getDate() === currentDate.getDate() &&
    comparatorDate.getMonth() === currentDate.getMonth()
    ? `Today, ${time > 12 ? `${time % 12} PM` : `${time} AM`}`
    : `${date?.slice(0, 10).split('-').reverse().join('-')}, ${
        time > 12 ? `${time % 12} PM` : `${time} AM`
      }`;
}

function getMonthName(month) {
  switch (month) {
    case '01':
      return ', Jan';
    case '02':
      return ', Feb';
    case '03':
      return ', March';
    case '04':
      return ', April';
    case '05':
      return ', May';
    case '06':
      return ', June';
    case '07':
      return ', July';
    case '08':
      return ', Aug';
    case '09':
      return ', Sep';
    case '10':
      return ', Oct';
    case '11':
      return ', Nov';
    case '12':
      return ', Dec';
    default:
      return '';
  }
}

function Appointments() {
  // Active
  const [tabLocal, setTabLocal] = useState('physical');

  // We want to re-render this everytime the user changes even
  const user = JSON.parse(localStorage.getItem('user'));

  const dispatch = useDispatch();

  const { appointments } = useSelector((state) => state.appointment.data);
  const { appointments: remoteAppointments } = useSelector(
    (state) => state.appointment.remote,
  );

  const appointmentsFormatted = appointments.map(transformAppointment);
  const remoteAppointmentsFormatted =
    remoteAppointments.map(transformAppointment);

  const handleFetch = useCallback(() => {
    if (user.doctor) {
      dispatch(getAllAppointments(user.doctor));
      dispatch(getAllRemoteAppointments(user.doctor));
    } else alert('You are not a doctor');

    // user.doctor && dispatch(getAllAppointments(user.doctor));
  }, [dispatch, user.doctor]);

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  // Getting the upcoming appointment
  const currentDate = moment();

  const appointmentsWithTimeDiff = appointments.map((appointment, index) => {
    const startTime = parseInt(appointment.startTime, 10); // Parse start time as integer
    let appointmentDate = moment(
      `${appointment.date.split('T')[0]}T${startTime}:00:00.000Z`,
    ).utc();
    const timeDiff = appointmentDate.diff(currentDate);
    return { ...appointment, timeDiff };
  });

  const nearestAppointment = appointmentsWithTimeDiff.reduce(
    (nearest, appointment) => {
      const isAfterCurrentDate = appointment.timeDiff > 0;
      const isNearestNull = nearest === null;

      if (
        isAfterCurrentDate &&
        (isNearestNull ||
          appointment.timeDiff < nearest.timeDiff ||
          (appointment.timeDiff === nearest.timeDiff &&
            moment(appointment.date).isBefore(moment(nearest.date))))
      ) {
        return appointment;
      }
      return nearest;
    },
    null,
  );

  const lastAppointment = appointmentsWithTimeDiff.reduce(
    (nearest, appointment) => {
      if (
        appointment.timeDiff > 0 &&
        (nearest === null || appointment?.timeDiff > nearest?.timeDiff)
      ) {
        return appointment;
      }
      return nearest;
    },
    null,
  );

  const formattedCurrentDate = currentDate.toISOString().split('T')[0];

  const todayAppointments = appointments.reduce((acc, appointment) => {
    if (appointment.date.split('T')[0] === formattedCurrentDate) {
      return acc + 1;
    }
    return acc;
  }, 0);

  /*
    Meta data
  */
  const cardMetaData = [
    {
      heading: 'Total Appointments',
      value: appointments.length,
      isHighlighted: true,
      highlightContentKey: 'Today remaining:',
      highlightContentValue: `${todayAppointments} appointments`,
    },
    {
      heading: 'Online appointments',
      value: remoteAppointmentsFormatted.length,
      isHighlighted: false,
    },
    {
      heading: 'Appointmentes till',
      value: nearestAppointment
        ? `${transformDate(lastAppointment.date)
            .split(' ')[0]
            .split('-')
            .slice(0, 1)}${getMonthName(
            transformDate(lastAppointment.date)
              .split(' ')[0]
              .split('-')
              .slice(1, 2)[0],
          )}`
        : '__',
      ctaContentType: false,
      isHighlighted: false,
    },
  ];

  return (
    <div className="absolute left-[16%] top-0 z-10 h-[100dvh] w-[84%] overflow-y-scroll">
      <Header name="Appointments" />
      <Overview cardMetaData={cardMetaData} data={appointments} />

      <div className="mt-4 w-full px-8 text-stone-800">
        <span className="text-[18px] font-bold">Appointments | This Month</span>

        <div className="mb-2 mt-4 flex space-x-4">
          <div
            className={`cursor-pointer rounded-full bg-stone-200 px-4 py-2 text-sm font-semibold ${
              tabLocal === 'physical' && '!bg-[#146EB4] text-stone-50'
            }`}
          onClick={(tabLocal) => setTabLocal("physical")}>
            Refund ({appointmentsFormatted.length})
          </div>

          <div
            className={`cursor-pointer rounded-full bg-stone-200 px-4 py-2 text-sm font-semibold ${
              tabLocal === 'online' && '!bg-[#146EB4] text-stone-50'
            }`}
            onClick={(tabLocal) => setTabLocal("online")}>
            Payload ({remoteAppointmentsFormatted.length})
          </div>
        </div>
      </div>

      {tabLocal === 'physical' ? (
        <Transactions
          isFor="Appointments"
          tableHeadMetadata={tableHeadMetaData}
          data={appointmentsFormatted}
          keyName="appointmentId"
        />
      ) : (
        <Transactions
          isFor="Appointments"
          data={remoteAppointmentsFormatted}
          tableHeadMetadata={tableHeadMetaData}
          keyName="appointmentId"
        />
      )}
    </div>
  );
}

export default Appointments;
