import { useState } from "react";
import styled from "styled-components";
import CalendarCell from "./CalendarCell";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";

const DayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
  pointer-events: none;
  .current_day {
    background: rgba(255, 0, 0, 0.8);
    color: white;
  }
  .day {
    border-radius: 50%;
    padding: 10px;
  }
`;

const CalendarWrapper = styled.div`
  font-family: Arial, sans-serif;
  margin: 0 auto;
  padding: 0;
  max-width: 500px;
  text-align: center;
`;

const Thead = styled.thead`
  position: sticky;
  top: 0;
  width: 100%;
  background-color: #f2f2f2;
  border: 1px solid #f2f2f2;
  max-width: 500px;
  margin: 0 auto;
`;

const Tbody = styled.tbody`
  margin-top: 150px;
`;

const Table = styled.table`
  border-collapse: collapse;
  margin: 0 auto;
  width: 100%;
  table-layout: fixed;

  th,
  td {
    padding: 8px;
    text-align: center;
    vertical-align: middle;
    width: calc(100% / 7);
  }

  td {
    border: 1px solid #ccc;
    font-size: 18px;
    height: 48px;

    &:hover {
      background-color: #f2f2f2;
    }
  }

  tbody {
    ${Tbody}
  }

  tbody tr:hover td {
    background-color: #f2f2f2;
  }
`;

const AppName = styled.span`
  display: flex;
  align-items: center;
  font-size: 24px;
`;

const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MonthName = styled.span`
  font-size: 20px;
  font-weight: normal;
  user-select: none;
  pointer-events: none;
`;

const Button = styled.button`
  border: none;
  background: none;
  color: rgba(255, 0, 0, 0.7);
  cursor: pointer;
  font-size: 24px;
  padding: 8px 16px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    /* background-color: #ccc; */
    transform: scale(1.5);
  }
`;

const AppHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

const DayOfWeek = styled.div`
  font-size: 12px;
  margin-bottom: 3px;
`;

const DayNumber = styled.div`
  font-size: 20px;
`;

const BottomButtons = styled.div`
  position: sticky;
  bottom: 0;
  background-color: #f2f2f2;
  border: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  padding: 0 50px;
`;

const WeekCalendar = () => {
  const [week, setWeek] = useState(0);

  const handlePreviousWeek = () => {
    setWeek(week - 1);
  };

  const handleNextWeek = () => {
    setWeek(week + 1);
  };

  const now = new Date();
  const weeksToSubtract = week * 7;
  now.setDate(now.getDate() + weeksToSubtract);
  const startOfWeek = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - now.getDay()
  );
  const daysOfWeek = [...Array(7)].map(
    (_, i) =>
      new Date(
        startOfWeek.getFullYear(),
        startOfWeek.getMonth(),
        startOfWeek.getDate() + i
      )
  );
  const monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    now
  );

  const currentHour = new Date().getHours();

  const [visible, setVisible] = useState(false);

  const [isBottomButtonsVisible, setIsBottomButtonsVisible] = useState(false);

  const [activeCell, setActiveCell] = useState("");

  const handleCellClick = (key: string) => {
    setActiveCell(key);
    setIsBottomButtonsVisible(true);
  };

  const onDeleteHandle = () => {
    localStorage.removeItem(activeCell);
    setIsBottomButtonsVisible(false);
  };

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  return (
    <>
      <CalendarWrapper>
        <AppHeader>
          <AppName>Interview Calendar</AppName>
          <Button onClick={() => setVisible(true)}>
            <AiOutlinePlus />
          </Button>
        </AppHeader>
        <Table border={1}>
          <Thead>
            <tr>
              <th></th>
              {daysOfWeek.map((day) => (
                <th key={day.getDay()}>
                  <DayWrapper>
                    <DayOfWeek>
                      {day.toLocaleDateString("en-US", { weekday: "narrow" })}
                    </DayOfWeek>
                    <DayNumber
                      className={`day ${
                        new Date().toDateString() === day.toDateString()
                          ? "current_day"
                          : ""
                      }`}
                    >
                      {day.getDate()}
                    </DayNumber>
                  </DayWrapper>
                </th>
              ))}
            </tr>
            <tr>
              <th></th>
              <th colSpan={7}>
                <CalendarHeader>
                  <Button onClick={handlePreviousWeek}>
                    <IoIosArrowBack />
                  </Button>
                  <MonthName>{`${monthName} ${now.getFullYear()}`}</MonthName>
                  <Button onClick={handleNextWeek}>
                    <IoIosArrowForward />
                  </Button>
                </CalendarHeader>
              </th>
            </tr>
          </Thead>
          <Tbody>
            {[...Array(24)].map((_, i) => (
              <tr
                key={i}
                style={{
                  backgroundColor:
                    currentHour === i ? "rgba(0, 0, 255, 0.1)" : "",
                }}
              >
                <td
                  style={{
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                >
                  {`${i.toString().padStart(2, "0")}:00`}
                </td>
                {daysOfWeek.map((day) => {
                  const key = `${day.toISOString().split("T")[0]}-${i
                    .toString()
                    .padStart(2, "0")}`;
                  return (
                    <CalendarCell
                      key={key}
                      unq_key={key}
                      onClick={handleCellClick}
                      isActive={key === activeCell}
                      isCurrent={
                        currentDate.toISOString() === day.toISOString()
                      }
                    />
                  );
                })}
              </tr>
            ))}
          </Tbody>
        </Table>
        {isBottomButtonsVisible && (
          <BottomButtons>
            <Button
              onClick={() =>
                alert("Я не знаю зачем тут эта кнопка, но в макете она была")
              }
            >
              Today
            </Button>
            <Button onClick={onDeleteHandle}>Delete</Button>
          </BottomButtons>
        )}
      </CalendarWrapper>
      <Modal isOpen={visible} onClose={() => setVisible(false)} />
    </>
  );
};

export default WeekCalendar;
