import { useState } from "react";
import "./HugeSeller.css";

function HugeSeller(): JSX.Element {

    // מקבלת את הערך הראשוני של המשתנה שהיא מטפלת בו
    // מחזירה מערך המכיל אך ורק שני פריטים
    // הפריט הראשון הוא המידע שברצוננו לנהל ע"י הפונקציה הזו
    // state-הפריט השני הוא פונקציה שאם נקרא לה היא תעדכן את ה
    // const arrForItem = useState<string>("");
    // const item = arrForItem[0];
    // const setItem = arrForItem[1];

    // destructuring assignment-שימוש ב
    const [item, setItem] = useState<string>("");

    // const arrForPrice = useState<number>(0);
    // const price = arrForPrice[0];
    // const setPrice = arrForPrice[1];

    // destructuring assignment-שימוש ב
    const [price, setPrice] = useState<number>(0);

    function showHugeSeller(): void {

        // ריאקט תרנדר שוב את הרכיב הזה, כלומר תקרא שוב לפונקציית הרכיב setItem-ברגע שנקרא ל
        // את הערך המעודכן ששלחנו useState-וגם תחזיר מהקריאה ל UI-לצורך עדכון ה
        setItem("White Wine");

        setPrice(50.4);
    }

    return (
        <div className="HugeSeller Box">
            <button onClick={showHugeSeller}>Show Huge Seller</button>
            <span>{item}, Price: ${price}</span>
        </div>
    );
}

export default HugeSeller;
