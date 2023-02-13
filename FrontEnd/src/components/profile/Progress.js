import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Chart from 'react-apexcharts';
import axios from 'axios';
import { statistic_score_exam } from '../../utils/constants';
import { useAuthContext } from '../../context/auth_context';

const initialState = {
  options: {
    chart: {
      id: 'basic-bar'
    },
    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ]
    }
  },
  series: [
    {
      name: 'Listening test',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
      name: 'Reading test',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  ]
};

const Progress = () => {
  const [Progress, setProgress] = useState(initialState);
  const { token } = useAuthContext();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${statistic_score_exam}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const listening = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const reading = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        console.log(response.data.statisticsNumberExam);

        let lisInfor;
        let readInfor;

        for (let i = 0; i < 2; i++) {
          if (response.data.statisticsNumberExam[i]._id.category != '63329f38623618c13355482f') {
            lisInfor = response.data.statisticsNumberExam[i];
          }

          if (response.data.statisticsNumberExam[i]._id.category == '63329f38623618c13355482f') {
            readInfor = response.data.statisticsNumberExam[i];
          }
        }

        for (const val of lisInfor.results) {
          listening[val.month - 1] = Math.ceil(val.count);
        }

        for (const val of readInfor.results) {
          reading[val.month - 1] = Math.ceil(val.count);
        }

        const d = new Date();
        const month = d.getMonth();

        const data = response.data;
        const temp = { ...Progress };
        temp.series[0].data = listening.splice(0, month + 1);
        temp.series[1].data = reading.splice(0, month + 1);
        setProgress(temp);
        window.dispatchEvent(new Event('resize'));
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);

  return (
    <Wrapper>
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart options={Progress.options} series={Progress.series} type="line" width="750" />
          </div>
        </div>
      </div>
      <h3 className="progress-chart">The average number of test scores you get in each month</h3>
    </Wrapper>
  );
};

export default Progress;

const Wrapper = styled.section``;
