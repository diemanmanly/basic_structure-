/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.xde.service.handler;

import com.xde.service.controller.NewsController;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONObject;

/**
 *
 * @author anntd
 */
public class NewsServlet extends BaseServlet {

    JSONObject response = null;
    private static String P_CMD = "cmd";
    private static String P_LINK = "link";
    private static final String P_GET_HTML = "gethtml";

    @Override
    public void doProcess(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Object data = null;
        JSONObject response = null;
        try {
            String cmd = verifyString(P_CMD, req);
            switch (cmd) {
                case P_GET_HTML:{
                    String link = verifyString("link", req);
                    data = NewsController.getInstance().getHtml(link);
                    response = buildResponseNotAuthen();
                }
            }
            response = BaseServlet.buildResponse(0, data, "success");
        } catch (Exception ex) {
            Logger.getLogger(NewsServlet.class.getName()).log(Level.SEVERE, null, ex);
            response = BaseServlet.buildResponse(-1, null, "error");
        }
        outAndCloseCrossDomain(req, resp, response);
    }

}
