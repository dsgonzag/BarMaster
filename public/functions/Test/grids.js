var oTable = $('#grid-1').DataTable(
    {
        "ajax": {
                "url": "/administrator/Test/table",
                "dataSrc": ""
        },
        "columnDefs": [
                {
                    "targets": [ 1],
                    "visible": false,
                    "searchable": false
                }
            ],
        "columns": [
                        {
                            defaultContent: "<a class='btn btn-primary tooltips edit-row' href='#myModal1' data-toggle='modal' data-original-title='Modificar'>Editar</a>"+
                                    "<a href='#' class='btn btn-primary tooltips delete-row' data-placement='top' data-original-title='Eliminar'>Eliminar</a>"
    
                        },
                        { "data": "id" },
                        { "data": "descripcion" }
                    ],
        "oLanguage" : {
                "sLengthMenu" : "Show _MENU_ Rows",
                "sSearch" : "",
                "oPaginate" : {
                        "sPrevious" : "",
                        "sNext" : ""
                }
        },
        "aLengthMenu" : [[5, 10, 15, 20, -1], [5, 10, 15, 20, "All"] // change per page values here
        ],
        // set the initial value
        "iDisplayLength" : 5,
    } );
    
    var TableExport = function() {
        "use strict";
        //function to initiate DataTable
        //DataTable is a highly flexible tool, based upon the foundations of progressive enhancement,
        //which will add advanced interaction controls to any HTML table
        //For more information, please visit https://datatables.net/
        var runDataTable = function() {
                var newRow = false;
                var actualEditingRow = null;
    
                function restoreRow(oTable, nRow) {
                        var aData = oTable.fnGetData(nRow);
                        var jqTds = $('>td', nRow);
    
                        for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
                                oTable.fnUpdate(aData[i], nRow, i, false);
                        }
    
                        oTable.fnDraw();
                }
    
                function editRow(oTable, nRow) {
                        var aData = oTable.row(nRow).data();
                        read(aData.id);
                }
    
                $('#grid-1').on('click', '.delete-row', function(e) {
                        e.preventDefault();
                        if (newRow && actualEditingRow) {
                                oTable.fnDeleteRow(actualEditingRow);
                                newRow = false;
                        }
    
                        var nRow = $(this).parents('tr')[0];
                        var aData = oTable.row(nRow).data();
                        oTable.row(nRow).remove().draw();
                        remove_grid(aData.id);
                });
                $('#grid-1').on('click', '.edit-row', function(e) {
                        e.preventDefault();
                        if (actualEditingRow) {
                                if (newRow) {
                                        oTable.fnDeleteRow(actualEditingRow);
                                        newRow = false;
                                } else {
                                        restoreRow(oTable, actualEditingRow);
                                }
                        }
                        var nRow = $(this).parents('tr')[0];
                        editRow(oTable, nRow);
                        //actualEditingRow = nRow;
    
                });
    
        };
        return {
                //main function to initiate template pages
                init : function() {
                        runDataTable();
                }
        };
    }();
    