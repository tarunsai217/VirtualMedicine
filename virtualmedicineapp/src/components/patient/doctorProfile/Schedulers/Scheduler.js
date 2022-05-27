import React, { Component } from 'react';
import 'dhtmlx-scheduler';
import 'dhtmlx-scheduler/codebase/dhtmlxscheduler_material.css';
import 'dhtmlx-scheduler/codebase/ext/dhtmlxscheduler_limit';
 
const scheduler = window.scheduler;
 
export default class Scheduler extends Component {
    
    componentDidMount() {
        scheduler.skin = 'material';
        scheduler.config.header = [
            'day',
            'week',
            'date',
            'prev',
            'today',
            'next'
        ];
 
        var markedTimespan;
        scheduler.attachEvent("onBeforeViewChange", function(old_mode,old_date,mode,date){
          var viewStartDate = scheduler.date[mode + "_start"](new Date(date));
          if(mode == "month")
            viewStartDate = scheduler.date.week_start(viewStartDate);				
          if (markedTimespan) {
            scheduler.deleteMarkedTimespan(markedTimespan);
          }
          markedTimespan = scheduler.addMarkedTimespan({
            start_date: viewStartDate,
            end_date: new Date(),
            zones: "fullday",
            type: "dhx_time_block"
          });
          return true;
        });
    
        scheduler.templates.month_date_class = function(date){
          if (date < new Date()){					
            return "gray_section";
          } else {
            return "";
          }
        }
    
    
        const { events } = this.props;
        const { updateSchduleID } = this.props;
        console.log(events);
        scheduler.attachEvent("onClick", (id, e) => {
          console.log(e.path[1].ariaLabel);
          if(e.path[1].ariaLabel === 'BOOKED' || e.path[1].ariaLabel !== 'NOT_AVAILABLE'){
            e.path[1].classList.add('displayBooked');
          }
          if(!e.path[1].children[1].classList.contains("selected")){
            if(e.path[1].ariaLabel !== 'BOOKED' || e.path[1].ariaLabel !== 'NOT_AVAILABLE'){
              updateSchduleID(id);
            }
          } else {
            updateSchduleID('');
          }
        });
        scheduler.config.hour_size_px = 88;
        scheduler.init(this.schedulerContainer, new Date());
        scheduler.clearAll();
        scheduler.parse(events);

         
        
      }
      
    render() {
        return (
            <div
                ref={ (input) => { this.schedulerContainer = input } }
                style={ { width: '100%', height: '100%' } }
            ></div>
       );
    }
}