const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require("passport-local").Strategy

const app = express();
const port = 8000;
const cors = require('cors')
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

const jwt = require('jsonwebtoken')

mongoose.connect(
    "mongodb+srv://ductuan1234:ductuan1234.@chat-app.zfgjv82.mongodb.net/",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => {
    console.log("Connected to MongoDB")
}).catch((error) => {
    console.log("Error connecting to MongoDB", error)
})

app.listen(port, () => {
    console.log("Server running on port " + port)
})


const User = require("./models/user")
const Message = require("./models/message")

// Điểm cuối cùng người dùng đăng ký
app.post("/register", (req, res) => {
    const { name, email, password, image } = req.body;

    // tạo một người dùng
    const newUser = new User({
        name,
        email,
        password,
        image
    })

    // lưu người dùng vào database
    newUser.save().then(() => {
        res.status(200).json({ message: "Đăng ký người dùng thành công" })
    }).catch((error) => {
        console.log("Đăng ký người dùng thất bại", error);
        res.status(500).json({ message: "Đăng ký người dùng thất bại" })
    })
})

// Tạo token cho user

const createToken = (userId) => {
    const payload = {
        userId: userId,
    }
    // return jwt.sign({ id }, process.env.JWT_SECRET, {
    //     // expiresIn: 60 * 60 * 24
    // })
    const token = jwt.sign(payload, "asdwqewe", { expiresIn: "1h" });
    return token;
}




// Điểm cuối để đăng nhập của người dùng cụ thể đó

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    // Kiểm tra email và password 
    if (!email || !password) {
        res.status(404).json({ message: "Email hoặc mật khẩu không được để trống" })
    }

    // Kiểm tra người dùng có trong database
    User.findOne({ email })
        .then((user) => {
            if (!user) {
                // Không tìm thấy user
                res.status(404).json({ message: "User not found" })
            }

            // So sánh password
            if (user.password !== password) {
                res.status(404).json({ message: "Mật khẩu không đúng" })
            }

            // Tạo token
            const token = createToken(user._id);
            res.status(200).json({
                token
            })
        }).catch((error) => {
            console.log("Error in finding the user", error);
            res.status(500).json({ message: "Internal server Error" })
        })
})

// endpont to accces all the users expect the user who's is currently logged in

app.get("/users/:userId", (req, res) => {
    const loggedInUserId = req.params.userId;

    User.find({ _id: { $ne: loggedInUserId } })
        .then((users) => {
            res.status(200).json(users);
        })
        .catch((err) => {
            console.log("Error retrieving users", err);
            res.status(500).json({ message: "Error retrieving users" });
        });
});


//Send a request to a user
app.post("/friend-request", async (req, res) => {
    const { currentUserId, selectedUserId } = req.body;

    try {
        //update the recepient's friendRequestArray
        await User.findByIdAndUpdate(selectedUserId, {
            $push: { freindRequests: currentUserId },
        })


        //update the sender's setFriendRequests array

        await User.findByIdAndUpdate(currentUserId, {
            $push: { sentFriendRequests: selectedUserId },
        });

        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(500)
    }
})


// Show all the friend-request of a particular user
app.get("/friend-request/:userId", async (req, res) => {
    try {
        const { userId } = req.params;


        // fetch the user document based on the User id

        const user = await User.findById(userId).populate("freindRequests", "name email image").lean();

        const freindRequests = user.freindRequests;

        res.status(200).json(freindRequests);

    } catch (error) {
        console.log(error);
        res.sendStatus(500).json({ message: "Internal Server Error" })

    }
})