import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import SubIcon from "@material-ui/icons/Remove";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { snackMessage } from "../../actions";
import ClipboardButton from "../../components/ClipboardButton";

const emptyCost = { money: "", note: "", isCost: true };

const Money = () => {
  const dispatch = useDispatch();
  const [bills, setBills] = useState([emptyCost]);
  const [billText, setBillText] = useState("");
  const [remaining, setRemaining] = useState("");
  const [newRemaining, setNewRemaining] = useState("");

  const toggleIsCostState = (billIndex) => {
    setBills(
      bills.map((item, index) => {
        if (index === billIndex) {
          return { ...bills[billIndex], isCost: !bills[billIndex].isCost };
        }
        return item;
      })
    );
  };

  const addNew = () => {
    setBills([...bills, emptyCost]);
  };

  const changeMoney = (e, billIndex) => {
    setBills(
      bills.map((item, index) => {
        if (index === billIndex) {
          return { ...bills[billIndex], money: e.target.value };
        }
        return item;
      })
    );
  };

  const changeNote = (e, billIndex) => {
    setBills(
      bills.map((item, index) => {
        if (index === billIndex) {
          return { ...bills[billIndex], note: e.target.value };
        }
        return item;
      })
    );
  };

  useEffect(() => {
    let money = remaining;
    bills.map((bill) => {
      if (bill.money !== "" && bill.money !== 0) {
        if (bill.isCost) {
          money = parseFloat(money - bill.money).toFixed(2);
        } else {
          money = (parseFloat(money) + parseFloat(bill.money)).toFixed(2);
        }
      }
    });

    setNewRemaining(money);

    let tempBillText = "";

    bills.map((bill) => {
      if (bill.money !== "" && bill.money !== 0) {
        tempBillText += bill.isCost
          ? " - " + bill.money + `（${bill.note}）`
          : " + " + bill.money + `（${bill.note}）`;
      }
    });

    if (tempBillText !== "") {
      setBillText(`${remaining}${tempBillText} = ${newRemaining}`);
    }
  }, [remaining, bills, newRemaining]);

  const handleClick = () => {
    dispatch(snackMessage("复制成功"));
  };

  const remainingChange = (e) => {
    setRemaining(e.target.value);
    setNewRemaining(e.target.value);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <h2 style={{ textAlign: "center" }}>
          <TextField
            id="remaining"
            label="余额"
            type="number"
            required
            value={remaining}
            onChange={remainingChange}
          />
        </h2>
        {bills.map((bill, index) => (
          <Grid container spacing={2} key={index}>
            <Grid item xs={4}>
              <InputLabel htmlFor="money" required>
                金额
              </InputLabel>
              <Input
                id="money"
                type="number"
                value={bill.money}
                required
                onChange={(e) => changeMoney(e, index)}
                startAdornment={
                  <InputAdornment
                    position="start"
                    onClick={() => toggleIsCostState(index)}
                  >
                    {bill.isCost ? <SubIcon /> : <AddIcon />}
                  </InputAdornment>
                }
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                id="note"
                label="备注"
                required
                fullWidth
                onChange={(e) => changeNote(e, index)}
              />
            </Grid>
          </Grid>
        ))}
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <AddCircleIcon fontSize="large" onClick={addNew} />
        </div>
        <h2 style={{ textAlign: "right" }}>= {newRemaining}</h2>
      </Grid>
      {billText !== "" && (
        <Grid item xs={12}>
          {billText}
          <ClipboardButton text={billText} handleClick={handleClick} />
        </Grid>
      )}
    </Grid>
  );
};

export default Money;
