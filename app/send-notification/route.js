const admin = require("firebase-admin");
const { Message } = require("firebase-admin/messaging");
const { NextRequest, NextResponse } = require("next/server");

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  const serviceAccount = require('../../service_key.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export async function POST(request) {
  const { token, title, message, link } = await request.json();

  const payload = {
    token,
    notification: {
      title: title,
      body: message,
      imageUrl: "https://cdn-icons-png.flaticon.com/512/1827/1827272.png"
    },
    webpush: link && {
      fcmOptions: {
        link,
      },
    },
  };

  try {
    await admin.messaging().send(payload);

    return NextResponse.json({ success: true, message: "Notification sent!" });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}
