import React from "react";
import "../App.css";

const MedalList = ({ medalList, deleteCountry }) => {
  const sortedMedalList = [...medalList].sort((a, b) => b.gold - a.gold);

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>국가명</th>
            <th>금메달</th>
            <th>은메달</th>
            <th>동메달</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sortedMedalList.map((list) => {
            return (
              <tr key={list.name}>
                <td>{list.name}</td>
                <td>{list.gold}</td>
                <td>{list.silver}</td>
                <td>{list.bronze}</td>
                <td>
                  <button
                    onClick={() => {
                      deleteCountry(list.name);
                    }}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MedalList;
