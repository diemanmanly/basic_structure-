/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.xde.service.controller;

import java.io.IOException;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

/**
 *
 * @author anntd
 */
public class NewsController {

    private static NewsController _instance = null;

    private NewsController() {

    }

    public static synchronized NewsController getInstance() {
        if (_instance == null) {
            _instance = new NewsController();
        }
        return _instance;
    }

    public Object getHtml(String url) throws IOException {
        String data = null;
        Document doc = Jsoup.connect(url).get();
        Element el = doc.selectFirst("html");
        data = el.html();
        return data;
    }
}
