import React, { useState, useEffect } from 'react';

import { useAuthContext } from '../../context/auth_context';
import { statistic_number_exam } from '../../utils/constants';

import axios from 'axios';
import styled from 'styled-components';
import Chart from 'react-apexcharts';

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

const Statistics = () => {
  const [statistic, setStatistic] = useState(initialState);
  const { token } = useAuthContext();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${statistic_number_exam}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = response.data;
        console.log(data.statisticsNumberExam);

        const listening = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const reading = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

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

        const temp = { ...statistic };
        temp.series[0].data = listening.splice(0, month + 1);
        temp.series[1].data = reading.splice(0, month + 1);
        setStatistic(temp);
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
            <Chart options={statistic.options} series={statistic.series} type="bar" width="750" />
          </div>
        </div>
      </div>
      <h3 className="progress-chart">The total number of tests you take in each month</h3>
    </Wrapper>
  );
};

export default Statistics;
const Wrapper = styled.section``;
