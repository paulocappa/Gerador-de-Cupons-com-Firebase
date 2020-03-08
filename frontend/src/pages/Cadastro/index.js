import React, { useState, useEffect } from "react";
import api from "../../services/api";
import Container from "../../components/Container";
import { Form, Buttons, MsgError, MsgSuccess } from "./styles";

export default function Cadastro() {
  const [malls, setMalls] = useState([]);
  const [stores, setStores] = useState([]);
  const [typeCoupons, setTypeCoupons] = useState([]);
  const [selectedMall, setSelectedMall] = useState("default");
  const [selectedStores, setSelectedStores] = useState("default");
  const [selectedTypeCoupon, setSelectedTypeCoupon] = useState("default");

  const [couponName, setCouponName] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [input1Value, setInput1Value] = useState("");
  const [input2Value, setInput2Value] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [success, setSuccess] = useState(null);
  const [msgSuccess, setMsgSuccess] = useState("");
  const [error, setError] = useState(null);
  const [msgError, setMsgError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getMalls() {
      const { data } = await api.get("/getMalls");

      await setMalls(data);
    }

    async function getTypeCoupons() {
      const { data } = await api.get("/getTypesCoupons");

      await setTypeCoupons(data);
    }

    getMalls();
    getTypeCoupons();

    const year = new Date().getFullYear();
    const month =
      new Date().getMonth().length > 1
        ? new Date().getMonth() + 1
        : `0${new Date().getMonth() + 1}`;

    const day =
      new Date().getDate().length > 1
        ? new Date().getDate()
        : `0${new Date().getDate()}`;

    setCurrentDate(`${year}-${month}-${day}`);
  }, []);

  useEffect(() => {
    if (error !== null) {
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  }, [error]);

  useEffect(() => {
    if (success !== null) {
      setTimeout(() => {
        setSuccess(null);
      }, 5000);
    }
  }, [success]);

  async function onSelectStoreChange(e) {
    await setSelectedStores(e.target.value);
  }

  async function onSelectMallChange(e) {
    setSelectedMall(e.target.value);

    if (e.target.value !== "default") {
      const { store } = malls.find(item => item.mall === e.target.value);

      await setStores(store);
    } else {
      setSelectedStores("default");
    }
  }

  async function onTypeCouponChange(e) {
    if (e.target.value === "default") {
      await setSelectedTypeCoupon("default");

      return;
    }

    const data = typeCoupons.find(coupon => coupon.type === e.target.value);

    await setSelectedTypeCoupon(data);
  }

  async function submitButton() {
    setLoading(true);

    if (
      selectedMall !== "default" &&
      selectedStores !== "default" &&
      couponName !== "" &&
      startDate !== null &&
      endDate !== null &&
      selectedTypeCoupon !== "default" &&
      input1Value !== "" &&
      input2Value !== ""
    ) {
      const { data } = await api.post("/createCoupon", {
        mall: selectedMall,
        store: selectedStores,
        couponName,
        startDate,
        endDate,
        typeCoupon: selectedTypeCoupon,
        input1Value,
        input2Value
      });

      if (data.error) {
        console.log(data.error);
        setError(true);
        setMsgError(data.error);
        setLoading(false);
      } else {
        await Promise.all([
          setSuccess(true),
          setMsgSuccess(data.success),
          setSelectedMall("default"),
          setSelectedStores("default"),
          setSelectedTypeCoupon("default"),
          setInput1Value(""),
          setInput2Value(""),
          setCouponName(""),
          setStartDate(null),
          setEndDate(null)
        ]);
      }
    } else {
      setError(true);
      setLoading(false);
      setMsgError("Todos os campos são obrigatórios");
    }
  }

  function onChangeValue(e) {
    var target = e.target.value.replace(/\D/g, "");
    target = (target / 100).toFixed(2) + "";
    target = target.replace(".", ",");
    target = target.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
    target = target.replace(/(\d)(\d{3}),/g, "$1.$2,");

    setInput1Value(target);
  }

  function onChangeValue2(e) {
    var target = e.target.value.replace(/\D/g, "");
    target = (target / 100).toFixed(2) + "";
    target = target.replace(".", ",");
    target = target.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
    target = target.replace(/(\d)(\d{3}),/g, "$1.$2,");

    setInput2Value(target);
  }

  return (
    <>
      <Container>
        <header>
          <strong>Selecione o shopping e a loja</strong>
        </header>

        <Form>
          <div>
            <span>Shopping</span>
            <select value={selectedMall} onChange={onSelectMallChange}>
              <option value="default">--Selecione--</option>
              {malls.map((item, index) => (
                <option key={index} value={item.mall}>
                  {item.mall}
                </option>
              ))}
            </select>
          </div>

          <div>
            <span>Loja</span>
            <select value={selectedStores} onChange={onSelectStoreChange}>
              <option value="default">--Selecione--</option>
              {selectedMall !== "default" &&
                stores.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
            </select>
          </div>
        </Form>
      </Container>

      <Container>
        <header>
          <strong>Dados básicos</strong>
        </header>

        <Form>
          <div>
            <span>Título do Cupom</span>
            <input
              type="text"
              placeholder="Título do Cupom"
              onChange={e => setCouponName(e.target.value)}
              value={couponName}
            />
          </div>

          <div>
            <span>Data de início</span>
            <input
              type="date"
              min={currentDate}
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
            />
          </div>

          <div>
            <span>Data de término</span>
            <input
              type="date"
              min={startDate}
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
            />
          </div>
        </Form>
      </Container>

      <Container>
        <header>
          <strong>Dados básicos</strong>
        </header>

        <Form>
          <div>
            <span>Tipo do Cupom</span>
            <select
              value={selectedTypeCoupon.type || "default"}
              onChange={onTypeCouponChange}
            >
              <option value="default">--Selecione--</option>
              {typeCoupons.map((coupon, index) => (
                <option key={index} value={coupon.type}>
                  {coupon.type}
                </option>
              ))}
            </select>
          </div>

          {selectedTypeCoupon !== "default" ? (
            <>
              <div>
                <span>{selectedTypeCoupon.input1}</span>
                <input
                  type="text"
                  placeholder={selectedTypeCoupon.input1}
                  value={input1Value}
                  onChange={onChangeValue}
                />
              </div>

              <div>
                <span>{selectedTypeCoupon.input2}</span>
                {selectedTypeCoupon.input2.indexOf("(%)") !== -1 ? (
                  <input
                    type="number"
                    placeholder={selectedTypeCoupon.input2}
                    value={input2Value}
                    onChange={e => setInput2Value(e.target.value)}
                  />
                ) : (
                  <input
                    type="text"
                    placeholder={selectedTypeCoupon.input2}
                    value={input2Value}
                    onChange={onChangeValue2}
                  />
                )}
              </div>
            </>
          ) : (
            <>
              <div>
                <span>Selecione o tipo</span>
                <input type="text" disabled value="" />
              </div>

              <div>
                <span>Selecione o tipo</span>
                <input type="text" disabled value="" />
              </div>
            </>
          )}
        </Form>

        <Buttons>
          {error && <MsgError>{msgError}</MsgError>}
          {success && <MsgSuccess>{msgSuccess}</MsgSuccess>}
          <button loading={loading} onClick={submitButton}>
            Salvar
          </button>
        </Buttons>
      </Container>
    </>
  );
}
