import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import dayjs from "dayjs";
import DateCalendarServerRequest from "./DateCalendarServerRequest";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart"; // Import PieChart from MUI Charts
import "../styles/home.css";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [examDates, setExamDates] = useState([]);
  const [examCandidates, setExamCandidates] = useState([]);
  const [examStatusCounts, setExamStatusCounts] = useState([]);
  const [centers, setCenters] = useState([])

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8800/get-candidate");
        setUsers(res.data);

        // Count number of candidates per exam
        const candidateCount = res.data.reduce((acc, candidate) => {
          const examName = candidate.examId;
          acc[examName] = (acc[examName] || 0) + 1;
          return acc;
        }, {});

        // Convert candidateCount object into an array suitable for BarChart
        const examData = Object.keys(candidateCount).map((examName) => ({
          examName,
          candidates: candidateCount[examName],
        }));
        setExamCandidates(examData);
      } catch {
        console.log("Error fetching candidates");
      }
    };

    const fetchExamDates = async () => {
      try {
        const res = await axios.get("http://localhost:8800/get-exam");
        const dates = res.data.map((exam) =>
          dayjs(exam.examdate.trim(), "YYYY-MM-DD")
        );
        setExamDates(dates);

        // Count exam statuses
        const statusCount = res.data.reduce((acc, exam) => {
          const status = exam.status.toLowerCase(); // Ensure consistency in case
          acc[status] = (acc[status] || 0) + 1;
          return acc;
        }, {});

        // Convert statusCount object into an array suitable for PieChart
        const statusData = [
          { id: 0, value: statusCount.active || 0, label: "Active" },
          { id: 1, value: statusCount.deactive || 0, label: "Deactive" },
          { id: 2, value: statusCount.submitted || 0, label: "Submitted" },
        ];
        setExamStatusCounts(statusData);
      } catch {
        console.log("Error fetching exam dates");
      }
    };
    const fetchAllCenters = async()=>{
      try{
          const res = await axios.get(`http://localhost:8800/getcenters`)
          setCenters(res.data)
          console.log(res)
          console.log(res.status)
      }
      catch{
          console.log("Error")
      }
    }
    fetchAllCenters()

    fetchAllUsers();
    fetchExamDates();
  }, []);

  return (
    <div style={{ marginTop: "40px" }}>
      <div className="dash">
        <div className="dash1">
          <div className="dash111">
            <div className="dash12">
              <Card
                style={{
                  width: "18rem",
                  height: "8rem",
                  backgroundColor: "#bd66f1",
                  color: "white",
                }}
              >
                <Card.Body>
                  <Card.Title
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    Candidates Registered
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    <span
                      style={{
                        fontSize: "50px",
                        fontWeight: "bold",
                        display: "flex",
                        justifyContent: "center",
                        color: "white",
                      }}
                    >
                      {users.length}
                    </span>
                  </Card.Subtitle>
                </Card.Body>
              </Card>
            </div>
            <div className="dash12">
              <Card
                style={{
                  width: "18rem",
                  height: "8rem",
                  backgroundColor: "#bd66f1",
                  color: "white",
                }}
              >
                <Card.Body>
                  <Card.Title
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      display: "flex",
                      justifyContent: "center",
                      color: "white",
                    }}
                  >
                    Total Exams Conduction
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    <span
                      style={{
                        fontSize: "50px",
                        fontWeight: "bold",
                        display: "flex",
                        justifyContent: "center",
                        color: "white",
                      }}
                    >
                      {examDates.length}
                    </span>
                  </Card.Subtitle>
                </Card.Body>
              </Card>
            </div>
          </div>
          <div className="dash111" style={{ marginTop: "30px" }}>
            <div className="dash12">
              <Card
                style={{
                  width: "18rem",
                  height: "8rem",
                  backgroundColor: "#bd66f1",
                  color: "white",
                }}
              >
                <Card.Body>
                  <Card.Title
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    Total Exam Centers
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    <span
                      style={{
                        fontSize: "50px",
                        fontWeight: "bold",
                        display: "flex",
                        justifyContent: "center",
                        color: "white",
                      }}
                    >
                      {centers.length}
                    </span>
                  </Card.Subtitle>
                </Card.Body>
              </Card>
            </div>
            <div className="dash12">
              <Card
                style={{
                  width: "18rem",
                  height: "8rem",
                  backgroundColor: "#bd66f1",
                  color: "white",
                }}
              >
                <Card.Body>
                  <Card.Title
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      display: "flex",
                      justifyContent: "center",
                      color: "white",
                    }}
                  >
                    Feedbacks
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    <span
                      style={{
                        fontSize: "50px",
                        fontWeight: "bold",
                        display: "flex",
                        justifyContent: "center",
                        color: "white",
                      }}
                    >
                      43%
                    </span>
                  </Card.Subtitle>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>

        <div className="dash2">
          <DateCalendarServerRequest />
        </div>
      </div>
      <div className="dash112">
        <div className="dash13">
          <BarChart
            dataset={examCandidates}
            xAxis={[
              {
                scaleType: "band",
                dataKey: "examName",
                label: "Exam Name",
                tickPlacement: "middle",
                tickLabelPlacement: "middle",
              },
            ]}
            yAxis={[{ label: "Number of Candidates" }]}
            series={[{ dataKey: "candidates", label: "Candidates" }]}
            height={300}
            width={500}
            sx={{
              "& .MuiChartsLegend-series text tspan ": {
                fill: "white", 
              },
              "& .MuiChartsAxis-label text tspan ": {
                fill: "white", 
              },
              "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tick": {
                stroke: "white", 
              },
              "& .MuiChartsAxis-root .MuiChartsAxis-line": {
                stroke: "white", 
              },
              "& .MuiChartsAxis-root .MuiChartsAxis-tickLabel": {
                fill: "white", 
              },
            }}
          />
        </div>
        <div
          className="dash14"
          style={{ backgroundColor: "#111526", color: "white" }}
        >
          <div className="dash114">
            <h4>Exam Status</h4>
            <PieChart
              series={[
                {
                  data: examStatusCounts,
                  highlightScope: { faded: "global", highlighted: "item" },
                  faded: {
                    innerRadius: 30,
                    additionalRadius: -30,
                    color: "gray",
                  },
                },
              ]}
              height={250}
              sx={{
                "& .MuiChartsLegend-label text": {
                  fill: "white", // Text color for legend labels
                },
                "& .MuiChartsLegend-series text tspan": {
                  fill: "white", // Text color for each series
                },
                "& .MuiPieChart-label": {
                  fill: "white", // Pie slice labels color
                },
                "& .MuiTooltip-tooltip": {
                  backgroundColor: "#111526", // Tooltip background color
                  color: "white", // Tooltip text color
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
