import React, { useState } from "react";

const InfoForm = () => {
  const [info, setInfo] = useState({
    capital: 0,
    lotSize: 0,
    buyingPrice: 0,
    sellingPrice: 0,
    stopLoss: 0,
  });

  const [calculatedInfo, setCalculatedInfo] = useState({
    buyableLot: 0,
    slLoss: 0,
    slLossPr: 0,
    capitalBySl: 0,
    profit: 0,
    capitalByProfit: 0,

    capital: 0,
    lotSize: 0,
    buyingPrice: 0,
    sellingPrice: 0,
    stopLoss: 0,
  });

  const [err, setErr] = useState("");

  const handleCalculate = () => {
    if (
      info.capital < 0 ||
      info.lotSize < 0 ||
      info.buyingPrice < 0 ||
      info.sellingPrice < 0 ||
      info.stopLoss < 0
    ) {
      setErr("Please Enter Valid Details !");
      setTimeout(() => {
        setErr("");
      }, 700);
      return;
    }
    let answerObj = {
      capital: Number(info.capital) || 0,
      lotSize: Number(info.lotSize) || 0,
      buyingPrice: Number(info.buyingPrice) || 0,
      sellingPrice: Number(info.sellingPrice) || 0,
      stopLoss: Number(info.stopLoss) || 0,

      buyableLot: 0,
      slLoss: 0,
      slLossPr: 0,
      capitalBySl: 0,
      profit: 0,
      capitalByProfit: 0,
    };
    if (answerObj.capital && answerObj.lotSize && answerObj.buyingPrice) {
      answerObj.buyableLot = (
        Number(answerObj.capital) / (Number(answerObj.buyingPrice) * Number(answerObj.lotSize)) 
      ).toFixed(1);
      if (answerObj.stopLoss) {
        answerObj.slLoss = (
          (Number(answerObj.buyingPrice) - Number(answerObj.stopLoss)) *
          (Number(answerObj.buyableLot) * Number(answerObj.lotSize))
        ).toFixed(1);
        answerObj.slLossPr = (
          (Number(answerObj.slLoss) * 100) /
          Number(answerObj.capital)
        ).toFixed(1);
        answerObj.capitalBySl = (
          Number(answerObj.capital) - Number(answerObj.slLoss)
        ).toFixed(1);
      }
      if (answerObj.sellingPrice) {
        answerObj.profit = (
          (Number(answerObj.sellingPrice) - Number(answerObj.buyingPrice)) *
          (Number(answerObj.buyableLot) * Number(answerObj.lotSize))
        ).toFixed(1);
        answerObj.capitalByProfit = (
          Number(answerObj.capital) + Number(answerObj.profit)
        ).toFixed(1);
      }
    }
    setCalculatedInfo(answerObj);
    setInfo({
      capital: 0,
      lotSize: 0,
      buyingPrice: 0,
      sellingPrice: 0,
      stopLoss: 0,
    });
  };

  return (
    <div className="container" style={{backgroundColor : "yellowgreen"}}>
      <form className="mt-4 shadow h-100 w-100" style={{backgroundColor : "yellowgreen"}}>
        <div class="row p-3">
          {/* Total Capital  */}
          <div className="col-lg-4 col-sm-4 p-4">
            <label for="capital" class="form-label">
              Capital
            </label>
            <input
              min={0}
              type="number"
              class="form-control"
              id="capital"
              value={info.capital}
              onChange={(e) =>
                setInfo((prev) => {
                  return { ...prev, capital: e.target.value };
                })
              }
            />
          </div>

          {/* Lot Size  */}
          <div className="col-lg-4 col-sm-4 p-4">
            <label for="lotSize" class="form-label">
              Lot Size
            </label>
            <input
              min={0}
              type="number"
              class="form-control"
              id="lotSize"
              value={info.lotSize}
              onChange={(e) =>
                setInfo((prev) => {
                  return { ...prev, lotSize: e.target.value };
                })
              }
            />
          </div>

          {/* Buying Price for Stock  */}
          <div className="col-lg-4 col-sm-4 p-4">
            <label for="buyingPrice" class="form-label">
              Buying Price
            </label>
            <input
              min={0}
              type="number"
              class="form-control"
              id="buyingPrice"
              value={info.buyingPrice}
              onChange={(e) =>
                setInfo((prev) => {
                  return { ...prev, buyingPrice: e.target.value };
                })
              }
            />
          </div>
        </div>

        <div class="row p-3 pt-0">
          {/* Selling Price for Stock  */}
          <div className="col-lg-4 col-sm-4 p-4">
            <label for="sellingPrice" class="form-label">
              Selling Price
            </label>
            <input
              min={0}
              type="number"
              class="form-control"
              id="sellingPrice"
              value={info.sellingPrice}
              onChange={(e) =>
                setInfo((prev) => {
                  return { ...prev, sellingPrice: e.target.value };
                })
              }
            />
          </div>

          {/* Stop Loss  */}
          <div className="col-lg-4 col-sm-4 p-4">
            <label for="stopLoss" class="form-label">
              Stop Loss
            </label>
            <input
              min={0}
              type="number"
              class="form-control"
              id="stopLoss"
              value={info.stopLoss}
              onChange={(e) =>
                setInfo((prev) => {
                  return { ...prev, stopLoss: e.target.value };
                })
              }
            />
          </div>

          <div className="col-lg-4 p-4 text-center col-sm-12">
            <button
              type="button"
              disabled={
                !(info.capital > 0 && info.buyingPrice > 0 && info.lotSize > 0)
              }
              onClick={() => handleCalculate()}
              class="btn btn-lg btn-primary m-4"
            >
              Calculate Now
            </button>
            {err && (
              <p
                className="text-danger m-0 p-0"
                style={{ fontSize: "1.2em", fontWeight: "600" }}
              >
                {err}
              </p>
            )}
            {/* <button type="button" class="btn btn-primary m-4">
              Check History
            </button> */}
          </div>
        </div>

        {/* Answer  */}
        <div class="row p-3">
          <div className="col-6 px-4">
            <h3>Given Information</h3>
            <div className="p-3">
              <p>{`Capital : ${
                calculatedInfo.capital ? calculatedInfo.capital : 0
              } Rs`}</p>
              <p>{`Lot Size : ${
                calculatedInfo.lotSize ? calculatedInfo.lotSize : 0
              }`}</p>
              <p>{`Buying Price : ${
                calculatedInfo.buyingPrice ? calculatedInfo.buyingPrice : 0
              } Rs`}</p>
              <p>{`Selling Price : ${
                calculatedInfo.sellingPrice ? calculatedInfo.sellingPrice : 0
              } Rs`}</p>
              <p>{`Stop Loss : ${
                calculatedInfo.stopLoss ? calculatedInfo.stopLoss : 0
              } Rs`}</p>
            </div>
          </div>
          <div className="col-6 px-4 ">
            <h3>Calculated Information</h3>
            <div className="p-3">
              <p>{`You Can Buy Total : ${calculatedInfo.buyableLot} Lots`}</p>
              <p>
                Loss by SL Hit :{" "}
                <span className={calculatedInfo.slLoss && "text-danger"}>
                  {calculatedInfo.slLoss}
                </span>{" "}
                {`Rs ( ${calculatedInfo.slLossPr}% of your capital )`}
              </p>
              <p>{`Capital After SL Hit : ${calculatedInfo.capitalBySl} Rs`}</p>
              <p>
                Profit By Selling Price :{" "}
                <span className={calculatedInfo.profit && "text-success"}>
                  {calculatedInfo.profit}
                </span>{" "}
                {`Rs ( Your Capital Will Be ${calculatedInfo.capitalByProfit} Rs )`}
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InfoForm;
