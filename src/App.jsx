import React, { useState } from "react";
import "./App.css";
import MedalList from "./components/MedalList";

function App() {
  // 상태 관리를 위한 useState 훅 사용
  const [country, setCountry] = useState("");
  const [gold, setGold] = useState("");
  const [silver, setSilver] = useState("");
  const [bronze, setBronze] = useState("");
  const [medalList, setMedalList] = useState([]);

  // 입력값 유효성 검사 함수
  const validateInput = () => {
    if (!country.trim() || !gold.trim() || !silver.trim() || !bronze.trim()) {
      alert("모든 빈칸을 다 채워주세요!");
      return false;
    }

    if (isNaN(gold) || isNaN(silver) || isNaN(bronze)) {
      alert("메달은 숫자로 입력해주세요!");
      return false;
    }
    return true;
  };

  // 폼 초기화 함수
  const resetForm = () => {
    setCountry("");
    setGold("");
    setSilver("");
    setBronze("");
  };

  // 새로운 국가 추가 함수
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateInput()) {
      return;
    }

    const existingCountry = medalList.find((list) => list.name === country);
    if (existingCountry) {
      alert("이미 존재하는 국가입니다. 업데이트 버튼을 사용해주세요!");
      return;
    }

    const newMedalList = {
      name: country,
      gold: parseInt(gold),
      silver: parseInt(silver),
      bronze: parseInt(bronze),
    };

    setMedalList([...medalList, newMedalList]);
    resetForm();
  };

  // 기존 국가 정보 업데이트 함수
  const handleUpdate = () => {
    if (!validateInput()) {
      return;
    }

    const updatedList = medalList.map((item) =>
      item.name === country
        ? {
            ...item,
            gold: parseInt(gold),
            silver: parseInt(silver),
            bronze: parseInt(bronze),
          }
        : item
    );

    if (JSON.stringify(updatedList) === JSON.stringify(medalList)) {
      alert(
        "업데이트할 국가를 찾을 수 없습니다. 새로운 국가를 추가하려면 '국가 추가' 버튼을 사용해주세요."
      );
      return;
    }

    setMedalList(updatedList);
    resetForm();
  };

  // 국가 삭제 함수
  const deleteCountry = (countryName) => {
    const newMedalList = medalList.filter((list) => list.name !== countryName);
    setMedalList(newMedalList);
  };

  return (
    <div className="main-container">
      <h1>2024 파리 올림픽</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="input-container">
          <label htmlFor="country">국가명</label>
          <input
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="gold">금메달</label>
          <input
            id="gold"
            value={gold}
            onChange={(e) => setGold(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="silver">은메달</label>
          <input
            id="silver"
            value={silver}
            onChange={(e) => setSilver(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="bronze">동메달</label>
          <input
            id="bronze"
            value={bronze}
            onChange={(e) => setBronze(e.target.value)}
          />
        </div>
        <div className="btn-container">
          <button type="submit">국가 추가</button>
          <button type="button" onClick={handleUpdate}>
            업데이트
          </button>
        </div>
      </form>
      <div className="list">
        <MedalList medalList={medalList} deleteCountry={deleteCountry} />
      </div>
    </div>
  );
}

export default App;
