sap.ui.define([
    'sap/ui/core/mvc/Controller',
	'sap/ui/model/odata/v2/ODataModel'
],

    function (Controller, ODataModel) {
        "use strict";

        return Controller.extend("borsatakip.controller.Detail", {

            getRouter: function () {
                return this.getOwnerComponent().getRouter();
              },
          
            onInit: function () {

                // this.getRouter().getRoute("detail").attachPatternMatched(this._onMasterMatched, this);
                this._getOdataModel();


            var hisseModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(hisseModel,"selectHisse");
            
            hisseModel.setDefaultBindingMode("TwoWay");

            },

            formatRowHighlight: function (oValue) {
                // Your logic for rowHighlight goes here
                if (oValue == 0) {
                    return "Error";
                } else if (oValue < 3) {
                    return "Success";
                } else if (oValue < 5) {
                    return "None";
                }
                return "Success";
            },
            _onMasterMatched: function () {
                this._getOdataModel();
                // this._getDetailDatas();
              },
              _getOdataModel: function () {
                try {
                  var userInfo = new UserInfo();
                  var userId = userInfo.getId();
                } catch (error) {
                  userId = 'ACETIN';
                }
          
          
                if (userId === "DEFAULT_USER") {
                  userId = "ACETIN";
                }
          
                var odataModel = this.getOwnerComponent().getModel();
          
                var oMainModel = new sap.ui.model.json.JSONModel();
                var oHisselerModel = new sap.ui.model.json.JSONModel();
        
          
                //var oEgitimModel = new sap.ui.model.json.JSONModel();
          
                var oView = this.getView();
                var oRouter = this.getRouter();
          
                sap.ui.getCore().setModel(oMainModel, "mainModel");
                this.getView().setModel(oMainModel, "mainModel");
          
                sap.ui.getCore().setModel(oHisselerModel, "hisseler");
                this.getView().setModel(oHisselerModel, "hisseler");
          
                oView.setModel(oMainModel, "mainModel");
          
                odataModel.setUseBatch(true);
                odataModel.setDeferredGroups(["group1"]);
          
                odataModel.read("/ModelBorsaSet", {
                  groupId: "group1"
                });
          
          
                odataModel.submitChanges({
                  groupId: "group1",
                  success: function (oData) {
          
                    var aHisse = [];
          
                    aHisse = oData.__batchResponses[0].data.results;
          
                    oHisselerModel.setData({
                      list: aHisse
                    });
          
                    var oSelectHisse = {}, aSelectHisse = [];
                    for (var i = 0; i < aHisse.length; i++) {
                      oSelectHisse = {};
                      oSelectHisse.Hisse = aHisse[i].AlinanHisse;
                      oSelectHisse.Aciklama = aHisse[i].HisseAciklama;
                      oSelectHisse.Tarih = aHisse[i].AlinanTarih;
                      oSelectHisse.Adet = aHisse[i].AlinanAdet;
                      oSelectHisse.Birim= aHisse[i].OlcuBirimi;
                      oSelectHisse.Alis = aHisse[i].AlisFiyat;
                      oSelectHisse.ParaBirim = aHisse[i].ParaBirimi;
                      oSelectHisse.GuncelFiyat = aHisse[i].GuncelFiyat;
                      oSelectHisse.Maliyet = aHisse[i].Maliyet;
                      oSelectHisse.GuncelDeger = aHisse[i].GuncelDeger;
                      oSelectHisse.KarZarar = aHisse[i].KarZarar;          
                      aSelectHisse.push(oSelectHisse);
                      
                    }
                    var oHisseModel = this.getView().getModel( "selectHisse");
          
                    oHisseModel.setData({
                      list: aSelectHisse
                    })
                    
                  }.bind(this),
                  error: function (err) { }
                });
            },
        });
    });
