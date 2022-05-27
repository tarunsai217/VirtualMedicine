let root='/virtualmedicine/v1'

patientRoutes=[ 
    {
        url: `${root}/user/patient`,
        auth: false,
        proxy: {
            target: "http://localhost:8020/api/v1/user/patient",
            changeOrigin: true,
            pathRewrite: {
                [`^/virtualmedicine/v1/user/patient`]: '',
            },
        }
    },
    {
        url: `${root}/user/patient/login`,
        auth: false,
        proxy: {
            target: "http://localhost:8020/api/v1/user/patient/login ",
            changeOrigin: true,
            pathRewrite: {
                [`^/virtualmedicine/v1/user/patient/login`]: '',
            },
        }
    },
    {
        url: `${root}/user/patient/:patientId`,
        auth: true,
        proxy: {
            target: "http://localhost:8020/api/v1/user/patient/:patientId",
            changeOrigin: false,
            pathRewrite: {
                [`^/virtualmedicine/v1/user/patient/:patientId`]: '',
            },
        }
    }
 ];
doctorRoutes=[ 
    {
        url: `${root}/user/doctor`,
        auth: false,
        proxy: {
            target: "http://localhost:8020/api/v1/user/doctor",
            changeOrigin: false,
            pathRewrite: {
                [`^/virtualmedicine/v1/user/doctor`]: '',
            },
        }
    },
    {
        url: `${root}/user/doctor/login`,
        auth: true,
        proxy: {
            target: "http://localhost:8020/api/v1/user/doctor/login",
            changeOrigin: true,
            pathRewrite: {
                [`^/virtualmedicine/v1/user/doctor/login`]: '',
            },
        }
    },
    {
        url: `${root}/user/doctor/:emailId`,
        auth: true,
        proxy: {
            target: "http://localhost:8020/api/v1/user/doctor/:emailId",
            changeOrigin: true,
            pathRewrite: {
                [`^/virtualmedicine/v1/user/doctor/:emailId`]: '',
            },
        }
    },
    {
        url: `${root}/user/doctor/city/specialization`,
        auth: true,
        proxy: {
            target: "http://localhost:8020/api/v1/user/doctor/city/specialization",
            changeOrigin: true,
            pathRewrite: {
                [`^/virtualmedicine/v1/user/doctor/city/specialization`]: '',
            },
        }
    }    
];
scheduleRoutes=[     {
    url: `/scheduleservice/api/v1/schedules/create`,
    auth: true,
    proxy: {
        target: "http://localhost:8090/scheduleservice/api/v1/schedules/create",
        changeOrigin: false,
        pathRewrite: {
            [`^/scheduleservice/api/v1/schedules/create`]: '',
        },
    }
} ,
{
    url: `/scheduleservice/api/v1/schedules/getScheduleById/:id`,
    auth: true,
    proxy: {
        target: "http://localhost:8090/scheduleservice/api/v1/schedules/getScheduleById/:id",
        changeOrigin: true,
        pathRewrite: {
            [`^scheduleservice/api/v1/schedules/getScheduleById/:id`]: '',
        },
    }
} ,
{
    url: `scheduleservice/virtualmedicine/v1/schedules/getScheduleByDoctorEmail/:doctorEmail`,
    auth: true,
    proxy: {
        target: "http://localhost:8090/scheduleservice/api/v1/schedules/getScheduleByDoctorEmail/:doctorEmail",
        changeOrigin: true,
        pathRewrite: {
            [`^scheduleservice/virtualmedicine/v1/schedules/getScheduleByDoctorEmail/:doctorEmail`]: '',
        },
    }
} ,
{
    url: `${root}/schedules/getScheduleByDoctorEmail/scheduleDate/:doctorEmail/:scheduleDate`,
    auth: true,
    proxy: {
        target: "http://localhost:8090/scheduleservice/api/v1/schedules/getScheduleByDoctorEmail/scheduleDate/:doctorEmail/:scheduleDate",
        changeOrigin: true,
        pathRewrite: {
            [`^/virtualmedicine/v1/schedules/getScheduleByDoctorEmail/scheduleDate/:doctorEmail/:scheduleDate`]: '',
        },
    }
} ,
{
    url: `${root}/schedules/updateSchedule/:id`,
    auth: true,
    proxy: {
        target: "http://localhost:8090/scheduleservice/api/v1/schedules/updateSchedule/:id",
        changeOrigin: true,
        pathRewrite: {
            [`^/virtualmedicine/v1/schedules/updateSchedule/:id`]: '',
        },
    }
} ];
appointmentRoutes=[ {
    url: `${root}/appointments/appointment`,
    auth: false,
    proxy: {
        target: "http://localhost:8091/api/v1/appointments/appointment",
        changeOrigin: false,
        pathRewrite: {
            [`^/virtualmedicine/v1/appointments/appointment`]: '',
        },
    }
},
{
    url: `${root}/appointments/appointment/:id`,
    auth: false,
    proxy: {
        target: "'http://localhost:8091/api/v1/appointments/appointment/:id'",
        changeOrigin: false,
        pathRewrite: {
            [`^/virtualmedicine/v1/appointments/appointment/:id`]: '',
        },
    }
},
{
    url: `${root}/appointments/appointment/patient/:patientEmail`,
    auth: false,
    proxy: {
        target: "http://localhost:8091/api/v1/appointments/appointment/patient/:patientEmail",
        changeOrigin: false,
        pathRewrite: {
            [`^/virtualmedicine/v1/appointments/appointment/patient/:patientEmail`]: '',
        },
    }
},
{
    url: `${root}/appointments/appointment/doctor/:doctorEmail`,
    auth: false,
    proxy: {
        target: "http://localhost:8091/api/v1/appointments/appointment/doctor/:doctorEmail",
        changeOrigin: false,
        pathRewrite: {
            [`^/virtualmedicine/v1/appointments/appointment/doctor/:doctorEmail`]: '',
        },
    }
},
{
    url: `${root}/appointments/appointment/schdule/:id`,
    auth: false,
    proxy: {
        target: "http://localhost:8091/api/v1/appointments/appointment/schdule/:id",
        changeOrigin: false,
        pathRewrite: {
            [`^/virtualmedicine/v1/appointments/appointment/schdule/:id`]: '',
        },
    }
}
];




const ROUTES = [...patientRoutes,...doctorRoutes,...scheduleRoutes,...appointmentRoutes]

exports.ROUTES = ROUTES;