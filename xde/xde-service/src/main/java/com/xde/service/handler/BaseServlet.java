/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.xde.service.handler;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * @author anntd
 */
public abstract class BaseServlet extends HttpServlet {

    public static final String R_CODE = "code";
    public static final String R_DATA = "data";
    public static final String R_MESSAGE = "msg";
    public static final String P_CMD = "cmd";

    public static final String P_PROJECT_ID = "projectId";
    public static final String P_PROJECT_NAME = "projectName";
    public static final String P_PRODUCT_ID = "productId";
    public static final String P_PRODUCT_NAME = "productName";
    public static final String P_STATID = "statId";
    public static final String P_STATIDS = "statIds";
    public static final String P_STATSID = "statsId";
    public static final String P_STATSIDS = "statsIds";
    public static final String P_STAT_NAME = "statName";
    public static final String P_ENABLE = "enable";
    public static final String P_DATA = "data";
    public static final String P_TEMPLATE = "template";
    public static final String P_TYPE = "type";
    public static final String P_DATE_FROM = "dateFrom";
    public static final String P_DATE_TO = "dateTo";

    public static final String P_TITLE = "title";
    public static final String P_SUB_TITLE = "subtitle";
    public static final String P_Y_TITLE = "yTitle";
    public static final String P_DESCRIPTION = "description";

    public static String P_STATUS = "status";
    public static String P_FROM = "from";
    public static String P_TO = "to";

    public static String P_PAGE = "page";
    public static String P_SIZE = "size";

    public static final String P_ID = "id";
    public static final String P_IDS = "ids";
    public static final String P_STAT_DATE = "statDate";
    public static String P_POS = "pos";
    public static final String P_NUM = "num";
    public static final String P_STATS_LIST = "statsList";
    public static final String P_ALL_STATS = "allStats";
    public static final String P_PARAM = "param";

    public abstract void doProcess(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doProcess(req, resp); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doProcess(req, resp);
    }

    protected void responseNotAuthen(HttpServletRequest req, HttpServletResponse resp) {
        JSONObject response = null;
        try {
            response = buildResponseNotAuthen();
        } catch (Exception ex) {
//            _logger.error("Exception when responseNotAuthen()", ex);
        } finally {
            outAndClose(req, resp, response);
        }
    }

    protected JSONObject buildResponseNotAuthen() {
        JSONObject response = null;
        try {
            response = buildResponse(-22, null);
        } catch (Exception ex) {
//            _logger.error("Exception when buildResponseNotAuthen()", ex);
        }
        return response;
    }

    protected JSONObject buildResponseNotAuthor() {
        JSONObject response = null;
        try {
            response = buildResponse(-1, null);
        } catch (Exception ex) {
//            _logger.error("Exception when buildResponseNotAuthor()", ex);
        }
        return response;
    }

    protected void responseNotAuthor(HttpServletRequest req, HttpServletResponse resp) {
        JSONObject response = null;
        try {
            response = buildResponseNotAuthor();
        } catch (Exception ex) {
//            _logger.error("Exception when responseNotAuthor()", ex);
        } finally {
            outAndClose(req, resp, response);
        }
    }

    protected JSONObject buildResponseNotFound() {
        JSONObject response = null;
        try {
            response = buildResponse(-1, null);
        } catch (Exception ex) {
//            _logger.error("Exception when buildResponseNotAuthen()", ex);
        }
        return response;
    }

    protected boolean outAndCloseCrossDomain(HttpServletRequest req, HttpServletResponse resp, Object content) {
        boolean result = false;
        prepareHeaderJson(resp);
        resp.addHeader("Access-Control-Allow-Credentials", "true");
        resp.addHeader("Access-Control-Allow-Origin", req.getHeader("Origin"));
        try (PrintWriter out = resp.getWriter()) {
            out.print(content);
            result = true;
        } catch (Exception ex) {
//            _logger.error(ex.getMessage() + " while processing URI \"" + req.getRequestURI() + "?" + req.getQueryString() + "\"", ex);
        }
        return result;
    }

    protected boolean outAndClose(HttpServletRequest req, HttpServletResponse resp, Object content) {
        boolean result = false;
        prepareHeaderJson(resp);
        resp.addHeader("Access-Control-Allow-Origin", "*");
        try (PrintWriter out = resp.getWriter()) {
            out.print(content);
            result = true;
        } catch (Exception ex) {
//            _logger.error(ex.getMessage() + " while processing URI \"" + req.getRequestURI() + "?" + req.getQueryString() + "\"", ex);
        }
        return result;
    }

    protected boolean outAndCloseHtml(HttpServletRequest req, HttpServletResponse resp, Object content) {
        boolean result = false;
        prepareHeaderHtml(resp);
        resp.addHeader("Access-Control-Allow-Origin", "*");

        try (PrintWriter out = resp.getWriter()) {
            out.print(content);
            result = true;
        } catch (Exception ex) {
//            _logger.error(ex.getMessage() + " while processing URI \"" + req.getRequestURI() + "?" + req.getQueryString() + "\"", ex);
        }
        return result;
    }

    protected void prepareHeaderHtml(HttpServletResponse resp) {
        resp.setCharacterEncoding("utf-8");
        resp.setContentType("text/html; charset=UTF-8");
    }

    protected void prepareHeaderJs(HttpServletResponse resp) {
        resp.setCharacterEncoding("utf-8");
        resp.setContentType("text/javascript; charset=UTF-8");
    }

    public void prepareHeaderJson(HttpServletResponse resp) {
        resp.setCharacterEncoding("utf-8");
        resp.setContentType("application/json; charset=UTF-8");
    }

    protected int verifyInt(String param, HttpServletRequest req) throws Exception {
        String strTemp = req.getParameter(param);
        if (strTemp == null) {
            throw new Exception(param + " is missing");
        }
        try {
            int result = Integer.parseInt(strTemp);
            return result;
        } catch (Exception ex) {
            throw new Exception(param + " must be a number");
        }
    }

    protected long verifyLong(String param, HttpServletRequest req) throws Exception {
        String strTemp = req.getParameter(param);
        if (strTemp == null) {
            throw new Exception(param + " is missing");
        }
        try {
            long result = Long.valueOf(strTemp);
            return result;
        } catch (Exception ex) {
            throw new Exception(param + " must be a number");
        }
    }

    protected int verifyInt(String param, HttpServletRequest req, int defaultValue) throws Exception {
        try {
            return verifyInt(param, req);
        } catch (Exception ex) {
            return defaultValue;
        }
    }

    protected boolean verifyBool(String param, HttpServletRequest req) throws Exception {
        String strTemp = req.getParameter(param);
        if (strTemp == null) {
            throw new Exception(param + " is missing");
        }
        try {
            boolean result = Boolean.parseBoolean(strTemp);
            return result;
        } catch (Exception ex) {
            throw new Exception(param + " must be a bool value");
        }
    }

    protected boolean verifyBool(String param, HttpServletRequest req, boolean defaultValue) throws Exception {
        try {
            return verifyBool(param, req);
        } catch (Exception ex) {
            return defaultValue;
        }
    }

    protected long verifyLong(String param, HttpServletRequest req, long defaultValue) throws Exception {
        try {
            return verifyLong(param, req);
        } catch (Exception ex) {
            return defaultValue;
        }
    }

    protected String verifyString(String param, HttpServletRequest req) throws Exception {
        String result = req.getParameter(param);
        if (result == null) {
            throw new Exception(param + " is missing");
        }
        if (result.isEmpty()) {
            throw new Exception(param + " is empty");
        }
        return result;
    }

    protected String verifyString(String param, HttpServletRequest req, String defValue) throws Exception {
        try {
            return verifyString(param, req);
        } catch (Exception ex) {
            return defValue;
        }
    }

    public List<String> verifyListString(String param, HttpServletRequest req, List<String> defValue) {
        try {
            return verifyListString(param, req);
        } catch (Exception ex) {
            return defValue;
        }
    }

    public List<String> verifyListString(String param, HttpServletRequest req) throws Exception {
        String result = req.getParameter(param);
        if (result == null || result.isEmpty()) {
            throw new Exception(param + " is missing or empty!");
        }
        List<String> data = Arrays.asList(result.split(","));
        if (data.isEmpty()) {
            throw new Exception(param + " is missing or empty!");
        }
        return data;
    }

    public JSONObject verifyJSONObject(String param, HttpServletRequest req, JSONObject defaultValue) {
        try {
            return verifyJSONObject(param, req);
        } catch (Exception ex) {
            return defaultValue;
        }
    }

    public JSONObject verifyJSONObject(String param, HttpServletRequest req) throws Exception {
        String result = req.getParameter(param);
        if (result == null || result.isEmpty()) {
            throw new Exception(param + " is missing or empty!");
        }
        return new JSONObject(result);
    }

    public List<String> verifyListStringJSONArray(String param, HttpServletRequest req, List<String> defValue) {
        try {
            return verifyListString(param, req);
        } catch (Exception ex) {
            return defValue;
        }
    }

    public List<String> verifyListStringJSONArray(String param, HttpServletRequest req) throws Exception {
        String result = req.getParameter(param);
        if (result == null || result.isEmpty()) {
            throw new Exception(param + " is missing or empty!");
        }
        JSONArray json = new JSONArray(result);
        if (json.length() <= 0) {
            throw new Exception(param + " is missing or empty!");
        }
        List<String> data = new ArrayList<>();
        for (int i = 0; i < json.length(); i++) {
            data.add(json.getString(i));
        }
        return data;
    }

    public static JSONObject buildResponse(int errorCode, Object data) throws JSONException {
        try {
            JSONObject responseData = new JSONObject();
            responseData.put(R_CODE, errorCode);
            responseData.put(R_DATA, data);
            responseData.put(R_MESSAGE, "");
            return responseData;
        } catch (Exception ex) {
            throw ex;
        }
    }

    public static JSONObject buildResponse(int errorCode, Object data, String message) throws JSONException {
        try {
            JSONObject responseData = new JSONObject();
            responseData.put(R_CODE, errorCode);
            responseData.put(R_DATA, data);
            if (message == null || message.isEmpty()) {
//                message = ZErrorHelper.errorToString(errorCode);
            }
            responseData.put(R_MESSAGE, message);
            return responseData;
        } catch (Exception ex) {
            throw ex;
        }

    }
}
