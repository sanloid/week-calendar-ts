import { useEffect, useState } from "react";
import styled from "styled-components";

interface Props {
  onClick: (key: string) => void;
  isActive: boolean;
  isCurrent: boolean;
  unq_key: string;
}

const CalendarCell: React.FC<Props> = ({
  onClick,
  isActive,
  isCurrent,
  unq_key,
}) => {
  const [cellValue, setCellValue] = useState(
    localStorage.getItem(unq_key) ?? ""
  );

  useEffect(() => {
    const newValue = localStorage.getItem(unq_key) ?? "";
    setCellValue(newValue);
  }, [localStorage.getItem(unq_key)]);

  const bgColor = isActive
    ? "rgba(0, 0, 255, 0.3)"
    : cellValue
    ? "rgba(0, 255, 0, 0.1)"
    : isCurrent
    ? "rgba(0, 0, 255, 0.1)"
    : "";

  return (
    <Cell onClick={() => onClick(unq_key)} style={{ backgroundColor: bgColor }}>
      <Value>{cellValue}</Value>
    </Cell>
  );
};

export default CalendarCell;

const Cell = styled.td`
  white-space: nowrap;
  overflow: auto;
  text-overflow: ellipsis;
`;

const Value = styled.div`
  padding: 8px;
`;
