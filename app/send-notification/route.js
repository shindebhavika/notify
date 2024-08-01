const admin = require("firebase-admin");
const { Message } = require("firebase-admin/messaging");
const { NextRequest, NextResponse } = require("next/server");

// Replace with your Firebase service account details directly
const serviceAccount = {
  "type": "service_account",
  "project_id": "fcm-demo-33514",
  "private_key_id": "38fdfa433f2b4b5e42428478cfb86801dcff1f51",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC91YiVuEEeiHiU\noMA89oMqFOP9pesKpYV2CnPqNDvdOjHG8LnF7LOeBZIf34o/33zjt8vIlbE9Qvrg\n5FLTAAzYKU9bSHJ9mxcvZwxNVccfZSRyexnR7dEpgRhfXEqp7vBJL/bA96Fo6bKY\nK03/lhDVsHgAg4KR6PhxEJDUFL5wSljzkbuZ3Iyc7NUMAZAzjNsAyld/GOOxa3sh\n8H/Mi82FebOhPeT+z2oxdhPScRYsJmpXjrIBUia77z/MlFRtWwHf5m9mTjmghV08\nXc4jSTQKVuuu80Me9/lOZEDHsyLqCn7AEPsyCfOmrFhwFGLFGpsRIoiDqNOEJyQZ\nMf7l2sh9AgMBAAECggEAQSJfs3NdkJLlwKVpYGF6vrkdQx4nR+dkJAzRGeZjNfRu\nOOLG8yTUul8R9LK4FlNh4CZjmwbVof31460jx/cH8TE3Y8w3UGai7WZPn8dTQ6/p\n8gfP46pULof3a1zY13a+5nW5FhvBO6SX3UNah1wfmZprik2VQugrOmwjLUmS0Cby\nsbAG/IGFhMyaILVASw2ANbj1HxoduMZoKbMsJyan2rY0xooo5PcFZ74tFCiLptCC\nb/TlJmWeDAhoqE7M4rgkeV8zgxm3QRKIONrPuWdGLzAUUdiorLDr0uy5jZxgtyg6\nwJpsJilsXUVp3mwpnLLoJfNgWvW4Rwh+gIr9cb41BwKBgQDtDqX7sak3zrLvnm1X\nIzN/EU9CpHIslNdpFrmHmjde05kdzW/cqk+WEVEqQs6qbW49flbl684KPi9MSyRj\n1hSMIV/OtrzP1eZgpe329VOuwJviGyYlwGvpJxPNA8Q2VK8evyAGrmCNM2HXsiiJ\nec+Kxal9/FasNzEwPrfy7QywMwKBgQDNAN4aa4QlBsLAXKbGLDFFW3TJnNAibg0G\n5xrIbFBVeUcsD8HEMRga3F7lbLX0DfRYfeXyQ8NTMUqRadIEGSUT/ASSPD1FcV4+\np2B1g6O/7MQ/Wnf1JjKqUHagA3XPm/R3AhhDaJ9Y5/ly1mLucU5jw0AAMXf+Rfeu\nv5kHth40jwKBgHD01eqE0VkiSOkc2IT45QTbPqVGrpDHq40LowQWW+P3d7JXvcGr\n9ZhQUBiPFOLomer7VHTiU59V2jvEYmagD9Jl5L0fHgD6r3fGGQngBCv041JuFVNP\nyRuj3y+FZ+1rlLZV4/DLDn65yRl6bw5y2I4LeaPqpXISKoIOoKBEjBM5AoGBAJ+J\nf09cQLh37HO7JuauWaG6LMcBzFAfCPBIReWXtWTvPt4hXRALjNDKkudElM1bVr7P\nK3ZAGe/SOk+z5Ibf8qT8yansS1qRgWCM7VpGmdawsYEELLqRgXhdqhOY3cQ1gChl\nbvB2qRuNW+lswg0CDJlCx7nexZ0SYlCSNstzhUotAoGBAKEHbgLG+S0DFwhIRTT3\n/jTTJj+3armTuYzl4QdVhvTc5Ujcdc3f/zS4anzQTkl8tK9D6/XYcMvpH4BHhAvp\nuYiY9GfawHI9GdUoMZT0zlO2VSnVKwVeFt5Q7KG0gJU3uUDhdPjPPsSf6sVvSn8u\nppOaqvbEWts7+sWepUThj9VU\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-62pb7@fcm-demo-33514.iam.gserviceaccount.com",
  "client_id": "115094679818171965672",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-62pb7%40fcm-demo-33514.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
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
