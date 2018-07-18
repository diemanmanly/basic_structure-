/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.xde.service;

import com.xde.service.handler.NewsServlet;
import java.io.IOException;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

/**
 *
 * @author anntd
 */
public class Xde {

    public static void main(String[] args) throws IOException, Exception {
        Server server = new Server(8005);
 
        ServletContextHandler context = new ServletContextHandler(ServletContextHandler.SESSIONS);
        context.setContextPath("/");
        server.setHandler(context);
 
        context.addServlet(new ServletHolder(new NewsServlet()),"/news");
 
        server.start();
        server.join();
        
        
        
//        Document doc = Jsoup.connect("https://vuejs.org/").get();
////        System.out.println(String.valueOf(doc.select("quotes['KEH15']")));
//        Elements el = doc.select("html");
//        
//        for (Element e : el) {
//            String text = e.html();
//            System.out.println(text);
//        }

    }
}
