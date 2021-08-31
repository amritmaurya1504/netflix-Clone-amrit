import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import { auth } from '../firebase'
import Nav from './Nav'
import "./Profile.css"
import "./PlanScreen.css";
import db from "../firebase";
import axios from "axios"
const Profile = () => {
    const user = useSelector(selectUser);

    const signOut = () => {
        auth.signOut();
    }
    const [products, setProducts] = useState([]);
    const [payment, setPayment] = useState(false);
    const [orderId, setOrderId] = useState();
    const [paymentId, setPaymentId] = useState();
    const [signature, setSignature] = useState();
    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        const res = await axios.get("http://localhost:8000/products")
        // console.log(res.data);
        if (res.status === 200) {
            setProducts(res.data)
        }
    }


    const buyNow = async (productId) => {
        console.log(productId)
        try {
            const res = await axios.get(`http://localhost:8000/order/${productId}`);
            console.log(res);
            if (res.status != 200) {
                return;
            }
            const options = {
                "key": "YOUR_KEY", // Enter the Key ID generated from the Dashboard
                "amount": res.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                "currency": res.data.currency,
                "name": "Netflix Subscription",
                "description": res.data.notes.desc,
                "image": "https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png",
                "order_id": res.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                "handler": function (response) {
                    // alert(response.razorpay_payment_id);
                    // alert(response.razorpay_order_id);
                    // alert(response.razorpay_signature)
                    setOrderId(response.razorpay_order_id);
                    setPaymentId(response.razorpay_payment_id);
                    setSignature(response.razorpay_signature);
                    setPayment(true);
                },
                "prefill": {
                    "name": "Amrit Raj",
                    "email": "Enter your Email",
                    "contact": ""
                },
            };

            var rzp1 = new window.Razorpay(options);

            rzp1.open();

            rzp1.on('payment.failed', function (response) {
                alert(response.error.code);
                alert(response.error.description);
                alert(response.error.source);
                alert(response.error.step);
                alert(response.error.reason);
                alert(response.error.metadata.order_id);
                alert(response.error.metadata.payment_id);
            });
           

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="profle">
            <Nav />
            <div className="profle_body">
                <h1>Edit Profile</h1>
                <div className="profileInfo">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="" />
                    <div className="profile_Detail">
                        <h2>{user.email}</h2>
                        {
                            payment && (
                                <div className="order_Details">
                                    <h6>Payment Successfully Done.</h6>
                                    <h4>Payment Id : {paymentId}</h4>
                                    <h4>Order Id : {orderId}</h4>
                                </div>
                            )
                        }

                        <h4>Plans</h4>
                        {
                            products.map((product) => {
                                return (

                                    <div className="planScreen" key={product.id}>
                                        <div className="planscreenInfo">
                                            <h5>{product.name}</h5>
                                            <h6>{product.desc} &nbsp; <span>{product.currency}{product.price}</span> </h6>
                                        </div>
                                        <button onClick={() => buyNow(product.id)} >Subscribe</button>
                                    </div>
                                )
                            })
                        }

                        <div onClick={signOut} className="profile_plan">
                            <button className="pbtn">Sign Out</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile





{/* <PlaneScreen name="asd" desc="Asdasd" price="1234" />
                        <PlaneScreen name="asd" desc="Asdasd" price="1234" />
                        <PlaneScreen name="asd" desc="Asdasd" price="1234" /> */}
