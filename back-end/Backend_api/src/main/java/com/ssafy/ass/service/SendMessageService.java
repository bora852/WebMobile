package com.ssafy.ass.service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class SendMessageService {
	public void MessageSend(String location, String token) throws Exception {
		final String apiKey = "AAAAYSTsZDs:APA91bF1Xh2qqDYi48-QLnwH-TOi0pt-r0WGFW50jWMzgrs11kVF1zEzFBe-_XuYiWk3-_FXXCxCyUGHh7ST49pc_f7AC5JhJdWZHPjm8p2NTzAGMvb2924GpvCwS8of9Qs__f7EqFSs";
		URL url = new URL("https://fcm.googleapis.com/fcm/send");
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		conn.setDoOutput(true);
		conn.setRequestMethod("POST");
		conn.setRequestProperty("Content-Type", "application/json");
		conn.setRequestProperty("Authorization", "key=" + apiKey);

		conn.setDoOutput(true);

		// 이렇게 보내면 주제를 ALL로 지정해놓은 모든 사람들한테 알림을 날려준다.
//         String input = "{\"notification\" : {\"title\" : \"여기다 제목 넣기 \", \"body\" : \"여기다 내용 넣기\"}, \"to\":\"/topics/ALL\"}";

		// 이걸로 보내면 특정 토큰을 가지고있는 어플에만 알림을 날려준다 위에 둘중에 한개 골라서 날려주자
		String input = "{\"notification\" : {\"title\" : \" Tuna's Blog \", \"body\" : \""+location+"에 새글이 등록되었습니다.\"}, \"to\":\""+token+"\"}";

		OutputStream os = conn.getOutputStream();

		// 서버에서 날려서 한글 깨지는 사람은 아래처럼 UTF-8로 인코딩해서 날려주자
		os.write(input.getBytes("UTF-8"));
		os.flush();
		os.close();

		int responseCode = conn.getResponseCode();
		System.out.println("\nSending 'POST' request to URL : " + url);
		System.out.println("Post parameters : " + input);
		System.out.println("Response Code : " + responseCode);

		BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
		String inputLine;
		StringBuffer response = new StringBuffer();

		while ((inputLine = in.readLine()) != null) {
			response.append(inputLine);
		}
		in.close();
		// print result
		System.out.println(response.toString());

//		final String apiKey = "AAAAYSTsZDs:APA91bF1Xh2qqDYi48-QLnwH-TOi0pt-r0WGFW50jWMzgrs11kVF1zEzFBe-_XuYiWk3-_FXXCxCyUGHh7ST49pc_f7AC5JhJdWZHPjm8p2NTzAGMvb2924GpvCwS8of9Qs__f7EqFSs";
//		URL url = new URL("https://fcm.googleapis.com/fcm/send");
//		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
//		conn.setDoOutput(true);
//		conn.setRequestMethod("POST");
//		conn.setRequestProperty("Content-Type", "application/json");
//		conn.setRequestProperty("Authorization", "key=" + apiKey);
//
//		conn.setDoOutput(true);
//
//		// 이걸로 보내면 특정 토큰을 가지고있는 어플에만 알림을 날려준다 위에 둘중에 한개 골라서 날려주자
//		String input = "{\"notification\" : {\"title\" : \"새이 등록되었습니다. \", \"body\" : \"바디바디\"}, \"to\":\""+token+"+\"}";
//		OutputStream os = conn.getOutputStream();
//
//		// 서버에서 날려서 한글 깨지는 사람은 아래처럼 UTF-8로 인코딩해서 날려주자
//		os.write(input.getBytes("UTF-8"));
//		os.flush();
//		os.close();
//		int responseCode = conn.getResponseCode();
//		System.out.println("\nSending 'POST' request to URL : " + url);
//		System.out.println("Post parameters : " + input);
//		System.out.println("Response Code : " + responseCode);
//
//		BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
//		String inputLine;
//		StringBuffer response = new StringBuffer();
//
//		while ((inputLine = in.readLine()) != null) {
//			response.append(inputLine);
//		}
//		in.close();
//		// print result
//		System.out.println(response.toString());

	}
}
