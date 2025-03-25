/**
 *  Home page handler
 */

import { BpmnFlow, BpmnShapeModel, ConnectorConstraints, ConnectorModel, Diagram, DiagramBeforeMenuOpenEventArgs, DiagramGradient, DiagramTools, HorizontalAlignment, Node, NodeConstraints, NodeModel, PointModel, TextAlign, TextStyleModel, VerticalAlignment, } from '@syncfusion/ej2-diagrams';
import { SelectorViewModel } from './selector';
import { DialogComponent } from '@syncfusion/ej2-vue-popups';
import { BeforeOpenCloseMenuEventArgs, ContextMenu, MenuEventArgs, Toolbar, ToolbarComponent } from '@syncfusion/ej2-vue-navigations';

export class PaperSize {
    public pageWidth: number = 0;
    public pageHeight: number = 0;
}

export class UtilityMethods {


    public tempDialog: DialogComponent | undefined;
    public toolbarEditor: ToolbarComponent | undefined;

    /**
     * Binds node properties to the selected item model.
     * @param node The node whose properties should be bound.
     * @param selectedItem The item to bind the node properties to.
     */
    public bindNodeProperties(node, selectedItem): void {
        selectedItem.preventPropertyChange = true;
        selectedItem.nodeProperties.offsetX = (Math.round(node.offsetX * 100) / 100);
        selectedItem.nodeProperties.offsetY = (Math.round(node.offsetY * 100) / 100);
        selectedItem.nodeProperties.width = node.width ? (Math.round(node.width * 100) / 100) : (Math.round(node.minWidth * 100) / 100);
        selectedItem.nodeProperties.height = node.height ? (Math.round(node.height * 100) / 100) : (Math.round(node.minHeight * 100) / 100);
        selectedItem.nodeProperties.rotateAngle = node.rotateAngle;
        selectedItem.nodeProperties.strokeColor = this.getHexColor(node.style.strokeColor);
        selectedItem.nodeProperties.strokeStyle = node.style.strokeDashArray ? node.style.strokeDashArray : '';
        selectedItem.nodeProperties.strokeWidth = node.style.strokeWidth;
        selectedItem.nodeProperties.fillColor = this.getHexColor(node.style.fill);
        selectedItem.nodeProperties.opacity = node.style.opacity * 100;
        selectedItem.nodeProperties.opacityText = selectedItem.nodeProperties.opacity + '%';
        let aspectRatioBtn = (document.getElementById('aspectRatioBtn') as any).ej2_instances[0];
        node.constraints & NodeConstraints.AspectRatio ? document.getElementById('aspectRatioBtn').classList.add('e-active') : document.getElementById('aspectRatioBtn').classList.remove('e-active');
        node.constraints & NodeConstraints.AspectRatio ? aspectRatioBtn.iconCss = 'sf-icon-lock' : aspectRatioBtn.iconCss = 'sf-icon-unlock';
        (selectedItem.nodeProperties.gradient) = node.style.gradient.type !== 'None' ? true : false;
        var gradientElement = document.getElementById('gradientStyle');
        var backgroundType = document.getElementById('backgroundTypeDropdown');
        (backgroundType as any).ej2_instances[0].index = 0;
        if ((selectedItem.nodeProperties.gradient)) {
            gradientElement.className = 'row db-prop-row db-gradient-style-show';
            selectedItem.nodeProperties.gradientColor = node.style.gradient.stops[1].color;
            (backgroundType as any).ej2_instances[0].index = 1;
            var gradient = node.style.gradient as DiagramGradient;
            if (gradient.x1) {
                selectedItem.nodeProperties.gradientDirection = 'North';
            }
            else if (gradient.x2) {
                selectedItem.nodeProperties.gradientDirection = 'East';
            }
            else if (gradient.y1) {
                selectedItem.nodeProperties.gradientDirection = 'West';
            }
            else if (gradient.y2) {
                selectedItem.nodeProperties.gradientDirection = 'South';
            }
        }
        else {
            gradientElement.className = 'row db-prop-row db-gradient-style-hide';
            selectedItem.nodeProperties.gradientColor = '#ffffff';
            selectedItem.nodeProperties.gradientDirection = 'South';
        }
        selectedItem.preventPropertyChange = false;
    };

    /**
     * Converts a color string to its hexadecimal representation.
     * @param colorStr The color string to convert.
     * @returns The hexadecimal representation of the color.
     */
    public getHexColor(colorStr) {
        let a: HTMLDivElement = document.createElement('div');
        a.style.color = colorStr;
        let colors: number[] = window.getComputedStyle(document.body.appendChild(a)).color.match(/\d+/g).map(
            (a: string): number => {
                return parseInt(a, 10);
            }
        );
        document.body.removeChild(a);
        return (colors.length >= 3) ? '#' + (((1 << 24) + (colors[0] << 16) + (colors[1] << 8) + colors[2]).toString(16).substr(1)) : '';
    };

    /**
    * Binds text properties to the selected item model.
    * @param text The text style properties to bind.
    * @param selectedItem The item to bind the text properties to.
    */
    public bindTextProperties(text, selectedItem: SelectorViewModel): void {
        selectedItem.preventPropertyChange = true;
        selectedItem.textProperties.fontColor = this.getHexColor(text.color);
        selectedItem.textProperties.fontFamily = text.fontFamily;
        selectedItem.textProperties.fontSize = text.fontSize;
        selectedItem.textProperties.opacity = text.opacity * 100;
        selectedItem.textProperties.opacityText = selectedItem.textProperties.opacity + '%';
        let toolbarTextStyle: any = document.getElementById('toolbarTextStyle');
        if (toolbarTextStyle) {
            toolbarTextStyle = toolbarTextStyle.ej2_instances[0];
        }
        if (toolbarTextStyle) {
            toolbarTextStyle.items[0].cssClass = text.bold ? 'tb-item-start tb-item-selected' : 'tb-item-start';
            toolbarTextStyle.items[1].cssClass = text.italic ? 'tb-item-middle tb-item-selected' : 'tb-item-middle';
            toolbarTextStyle.items[2].cssClass = text.textDecoration === 'Underline' ? 'tb-item-end tb-item-selected' : 'tb-item-end';
        }
        this.updateTextAlign(text.textAlign);
        selectedItem.preventPropertyChange = false;
    };

    /**
    * Updates the text alignment of toolbar items based on alignment value.
    * @param textAlign The text alignment value.
    */
    public updateTextAlign(textAlign: TextAlign): void {
        let toolbarTextSubAlignment: any = document.getElementById('toolbarTextSubAlignment');
        if (toolbarTextSubAlignment) {
            toolbarTextSubAlignment = toolbarTextSubAlignment.ej2_instances[0];
        }
        if (toolbarTextSubAlignment) {
            for (let i: number = 0; i < toolbarTextSubAlignment.items.length; i++) {
                toolbarTextSubAlignment.items[i].cssClass = toolbarTextSubAlignment.items[i].cssClass.replace(' tb-item-selected', '');
            }
            let index: number = textAlign === 'Left' ? 0 : (textAlign === 'Center' ? 1 : 2)
            toolbarTextSubAlignment.items[index].cssClass = toolbarTextSubAlignment.items[index].cssClass + ' tb-item-selected';
        }
    };

    /**
    * Updates both horizontal and vertical alignment on the toolbar.
    * @param horizontalAlignment The horizontal alignment value.
    * @param verticalAlignment The vertical alignment value.
    */
    public updateHorVertAlign(horizontalAlignment: HorizontalAlignment, verticalAlignment: VerticalAlignment): void {
        this.updateHorAlign(horizontalAlignment);
        this.updateVerAlign(verticalAlignment);
    };

    /**
    * Updates both horizontal and vertical alignment on the toolbar.
    * @param horizontalAlignment The horizontal alignment value.
    * @param verticalAlignment The vertical alignment value.
    */
    public updateHorAlign(horizontalAlignment: HorizontalAlignment) {
        var toolbarHorAlignment: any = document.getElementById('toolbarTextAlignmentLeft');
        if (toolbarHorAlignment) {
            toolbarHorAlignment = toolbarHorAlignment.ej2_instances[0];
        }
        if (toolbarHorAlignment) {
            for (var i = 0; i < toolbarHorAlignment.items.length; i++) {
                toolbarHorAlignment.items[i].cssClass = toolbarHorAlignment.items[i].cssClass.replace(' tb-item-selected', '');
            }
            var index = horizontalAlignment === 'Right' ? 0 : (horizontalAlignment === 'Center' ? 1 : 2);
            toolbarHorAlignment.items[index].cssClass = toolbarHorAlignment.items[index].cssClass + ' tb-item-selected';
        }
    };
    /**
    * Handles actions when a connector is selected from the menu.
    * @param args The menu event arguments.
    */
    public onConnectorSelect(args: MenuEventArgs): void {
        let diagram = (document.getElementById('diagram') as any).ej2_instances[0];
        let toolbarObj = (document.getElementById('toolbarEditor') as any).ej2_instances[0];
        diagram.clearSelection();
        diagram.drawingObject.sourceID = '';
        diagram.drawingObject.type = args.item.text;
        diagram.drawingObject.shape = { type: 'Bpmn', sequence: 'Normal' };
        diagram.tool = DiagramTools.ContinuousDraw;
        diagram.selectedItems.userHandles = [];
        diagram.dataBind();
        this.removeSelectedToolbarItem(toolbarObj);
        let c = (document.getElementById('conTypeBtn') as any)
        c.classList.add('tb-item-selected');
    };

    /**
    * Removes selection highlighting from toolbar items.
    * @param toolbarObj The toolbar from which to remove selection highlights.
    */
    public removeSelectedToolbarItem(toolbarObj: Toolbar) {
        for (let i: number = 0; i < toolbarObj.items.length; i++) {
            var item = toolbarObj.items[i];
            if ((item.cssClass as string).indexOf('tb-item-selected') !== -1) {
                item.cssClass = (item.cssClass as string).replace(' tb-item-selected', '');
            }
        }
    };

    /**
    * Binds connector properties to the selected item model.
    * @param connector The connector whose properties should be bound.
    * @param selectedItem The item to bind the connector properties to.
    */
    public bindConnectorProperties(connector, selectedItem): void {
        selectedItem.preventPropertyChange = true;
        selectedItem.connectorProperties.lineColor = this.getHexColor(connector.style.strokeColor);
        selectedItem.connectorProperties.lineStyle = connector.style.strokeDashArray ? connector.style.strokeDashArray : '';
        selectedItem.connectorProperties.lineType = connector.type;
        selectedItem.connectorProperties.lineWidth = connector.style.strokeWidth;
        selectedItem.connectorProperties.sourceType = connector.sourceDecorator.shape;
        selectedItem.connectorProperties.targetType = connector.targetDecorator.shape;
        selectedItem.connectorProperties.opacity = connector.style.opacity * 100;
        selectedItem.connectorProperties.opacityText = selectedItem.connectorProperties.opacity + '%';
        selectedItem.connectorProperties.lineJumpSize = connector.bridgeSpace;
        selectedItem.connectorProperties.lineJump = connector.constraints & ConnectorConstraints.Bridging ? true : false;
        if (selectedItem.connectorProperties.lineJump) {
            document.getElementById('lineJumpSizeDiv').style.display = '';
        } else {
            document.getElementById('lineJumpSizeDiv').style.display = 'none';
        }
        selectedItem.connectorProperties.targetSize = connector.targetDecorator.width;
        selectedItem.connectorProperties.sourceSize = connector.sourceDecorator.width;
        selectedItem.preventPropertyChange = false;
    };

    /**
     * Returns a position string based on an offset.
     * @param offset The point model offset.
     * @returns The string representation of the position.
     */
    public getPosition(offset: PointModel): string {
        if (offset.x === 0 && offset.y === 0) {
            return 'TopLeft';
        } else if (offset.x === 0.5 && offset.y === 0) {
            return 'TopCenter';
        } else if (offset.x === 1 && offset.y === 0) {
            return 'TopRight';
        } else if (offset.x === 0 && offset.y === 0.5) {
            return 'MiddleLeft';
        } else if (offset.x === 1 && offset.y === 0.5) {
            return 'MiddleRight';
        } else if (offset.x === 0 && offset.y === 1) {
            return 'BottomLeft';
        } else if (offset.x === 0.5 && offset.y === 1) {
            return 'BottomCenter';
        } else if (offset.x === 1 && offset.y === 1) {
            return 'BottomRight';
        } else {
            return 'Center';
        }
    }

    /**
    * Updates vertical alignment of toolbar items.
    * @param verticalAlignment The vertical alignment value.
    */
    public updateVerAlign(verticalAlignment: VerticalAlignment) {
        var toolbarVerAlignment: any = document.getElementById('toolbarTextAlignmentTop');
        if (toolbarVerAlignment) {
            toolbarVerAlignment = toolbarVerAlignment.ej2_instances[0];
        }
        if (toolbarVerAlignment) {
            for (var i = 0; i < toolbarVerAlignment.items.length; i++) {
                toolbarVerAlignment.items[i].cssClass = toolbarVerAlignment.items[i].cssClass.replace(' tb-item-selected', '');
            }
            var index = verticalAlignment === 'Bottom' ? 0 : (verticalAlignment === 'Center' ? 1 : 2);
            toolbarVerAlignment.items[index].cssClass = toolbarVerAlignment.items[index].cssClass + ' tb-item-selected';
        }
    };

    /**
    * Manages the context menu selection ticks based on diagram elements.
    * @param boolean Boolean indicating if an item is checked.
    * @param args The menu event arguments.
    * @param diagram The diagram instance.
    */
    public updateContextMenuSelection(boolean, args, diagram) {
        if (diagram.selectedItems.nodes.length > 0) {
            var bpmnNode = diagram.selectedItems.nodes[0];
            var checked = boolean;
            if (((bpmnNode.shape as BpmnShapeModel) as BpmnShapeModel).shape === 'Gateway') {
                if (!args.parentItem) {
                    for (let i: number = 0; i < args.items[21].items.length; i++) {
                        if (((bpmnNode.shape).gateway.type === args.items[21].items[i].text || (bpmnNode.shape).gateway.type === args.items[21].items[i].id) || !checked) {
                            this.addTick(args, 21, checked, i);
                        }
                    }
                }
            }
            else if ((bpmnNode.shape).shape === 'Activity') {
                if (!args.parentItem) {
                    if ((bpmnNode.shape).activity.activity === 'Task') {
                        for (let i: number = 0; i < args.items[13].items.length; i++) {
                            if ((bpmnNode.shape).activity.activity === args.items[13].items[i].id || !checked) {
                                this.addTick(args, 13, checked, i);
                            }
                        }
                        for (let i: number = 0; i < args.items[20].items.length; i++) {
                            if ((bpmnNode.shape).activity.task.type === args.items[20].items[i].id || !checked) {
                                this.addTick(args, 20, checked, i);
                            }
                        }
                        if ((bpmnNode.shape).activity.task.call) {
                            this.singleItemTick(args, 17, true);
                        }
                        else {
                            this.singleItemTick(args, 17, false);
                        }
                        for (let i: number = 0; i < args.items[11].items.length; i++) {
                            if (((bpmnNode.shape).activity.task.loop === args.items[11].items[i].text || (bpmnNode.shape).activity.task.loop === args.items[11].items[i].id) || !checked) {
                                this.addTick(args, 11, checked, i);
                            }
                        }
                        if ((bpmnNode.shape).activity.task.compensation) {
                            this.singleItemTick(args, 12, true);
                        }
                        else {
                            this.singleItemTick(args, 12, false);
                        }
                    }
                    else if ((bpmnNode.shape).activity.activity === 'SubProcess') {
                        for (let i: number = 0; i < args.items[13].items.length; i++) {
                            if ((bpmnNode.shape).activity.activity === args.items[13].items[i].id || !checked) {
                                this.addTick(args, 13, checked, i);
                            }
                        }
                        for (let i: number = 0; i < args.items[11].items.length; i++) {
                            if (((bpmnNode.shape).activity.subProcess.loop === args.items[11].items[i].text || (bpmnNode.shape).activity.subProcess.loop === args.items[11].items[i].id) || !checked) {
                                this.addTick(args, 11, checked, i);
                            }
                        }
                        for (let i: number = 0; i < args.items[14].items.length; i++) {
                            if (((bpmnNode.shape).activity.subProcess.boundary === args.items[14].items[i].text || (bpmnNode.shape).activity.subProcess.boundary === args.items[14].items[i].id) || !checked) {
                                this.addTick(args, 14, checked, i);
                            }
                        }
                        if ((bpmnNode.shape).activity.subProcess.compensation) {
                            this.singleItemTick(args, 12, true);
                        }
                        else {
                            this.singleItemTick(args, 12, false);
                        }
                        if ((bpmnNode.shape).activity.subProcess.adhoc) {
                            this.singleItemTick(args, 10, true);
                        }
                        else {
                            this.singleItemTick(args, 10, false);
                        }
                    }
                }
            }
            else if ((bpmnNode.shape as BpmnShapeModel).shape === 'Event') {
                if (!args.parentItem) {
                    for (let i: number = 0; i < args.items[19].items.length; i++) {
                        if (((bpmnNode.shape).event.event === args.items[19].items[i].text || (bpmnNode.shape).event.event === args.items[19].items[i].id) || !checked) {
                            this.addTick(args, 19, checked, i);
                        }
                    }
                    for (let i: number = 0; i < args.items[18].items.length; i++) {
                        if ((bpmnNode.shape).event.trigger === args.items[18].items[i].text || !checked) {
                            this.addTick(args, 18, checked, i);
                        }
                    }
                }
            }
            else if ((bpmnNode.shape as BpmnShapeModel).shape === 'DataObject') {
                if (!args.parentItem) {
                    for (let i: number = 0; i < args.items[15].items.length; i++) {
                        if ((bpmnNode.shape).dataObject.type === args.items[15].items[i].text || !checked) {
                            this.addTick(args, 15, checked, i);
                        }
                    }
                    if ((bpmnNode.shape).dataObject.collection) {
                        this.singleItemTick(args, 16, true);
                    }
                    else {
                        this.singleItemTick(args, 16, false);
                    }
                }
            }
        }
        if (diagram.selectedItems.connectors.length > 0) {
            var bpmnConnector = diagram.selectedItems.connectors[0];
            var checked = boolean;
            if (((bpmnConnector.shape as BpmnFlow) as BpmnFlow).type === 'Bpmn') {
                if ((bpmnConnector.shape as BpmnFlow).flow === 'Association') {
                    if (!args.parentItem) {
                        for (let i: number = 0; i < args.items[9].items.length; i++) {
                            if (((bpmnConnector.shape as BpmnFlow).association === args.items[9].items[i].id || (bpmnConnector.shape as BpmnFlow).association === args.items[9].items[i].text) || !checked) {
                                this.addTick(args, 9, checked, i);
                            }
                        }
                        this.singleItemTick(args, 5, true);
                        this.singleItemTick(args, 6, false);
                        this.singleItemTick(args, 7, false);
                    }
                }
                if ((bpmnConnector.shape as BpmnFlow).flow === 'Sequence') {
                    if (!args.parentItem) {
                        for (let i: number = 0; i < args.items[8].items.length; i++) {
                            if (((bpmnConnector.shape as BpmnFlow).sequence === args.items[8].items[i].text || (bpmnConnector.shape as BpmnFlow).sequence === args.items[8].items[i].id) || !checked) {
                                this.addTick(args, 8, checked, i);
                            }
                        }
                        this.singleItemTick(args, 5, false);
                        this.singleItemTick(args, 6, true);
                        this.singleItemTick(args, 7, false);
                    }
                }
                if ((bpmnConnector.shape as BpmnFlow).flow === 'Message') {
                    if (!args.parentItem) {
                        for (let i: number = 0; i < args.items[22].items.length; i++) {
                            if (((bpmnConnector.shape as BpmnFlow).message === args.items[22].items[i].text || (bpmnConnector.shape as BpmnFlow).message === args.items[22].items[i].id) || !checked) {
                                this.addTick(args, 22, checked, i);
                            }
                        }
                        this.singleItemTick(args, 5, false);
                        this.singleItemTick(args, 6, false);
                        this.singleItemTick(args, 7, true);
                    }
                }
            }
        }

    };

    /**
    * Updates the selection indicators in the view menu.
    * @param diagram The diagram component.
    * @param pageBreak The page break setting.
    */
    public viewSelectionChange(diagram: Diagram, pageBreak: any) {
        var items = (document.getElementById('btnViewMenu') as any).ej2_instances[0].items;
        items[4].iconCss = diagram.pageSettings.showPageBreaks ? 'sf-icon-check-tick' : '';
    }

    /**
    * Adds or removes a tick mark from a context menu item.
    * @param args The menu open/close event arguments.
    * @param index The index of the menu item.
    * @param checked Boolean indicating if the item is checked.
    * @param i The index of the submenu item.
    */
    public addTick(args: BeforeOpenCloseMenuEventArgs, index: number, checked: boolean, i: number) {
        if (checked) {
            if ((args.items[index] as any).items[i].iconCss.indexOf('sf-icon-check-tick') === -1) {
                (args.items[index] as any).items[i].iconCss += ' sf-icon-check-tick';
            }
        }
        else {
            if ((args.items[index] as any).items[i].iconCss.indexOf('sf-icon-check-tick') !== -1) {
                (args.items[index] as any).items[i].iconCss = (args.items[index] as any).items[i].iconCss.replace(' sf-icon-check-tick', '');
            }
        }
    };

    /**
    * Adds or removes a tick mark from a single menu item.
    * @param args The menu event arguments.
    * @param index The index of the menu item.
    * @param boolean Boolean indicating if the item is checked.
    */
    public singleItemTick(args, index: number, boolean: boolean) {
        if (boolean) {
            if (args.items[index].iconCss.indexOf('sf-icon-check-tick') === -1) {
                args.items[index].iconCss += ' sf-icon-check-tick';
            }
        }
        else {
            if (args.items[index].iconCss.indexOf('sf-icon-check-tick') !== -1) {
                args.items[index].iconCss = args.items[index].iconCss.replace(' sf-icon-check-tick', '');
            }
        }
    };

    /**
    * Retrieves the current diagram's file name.
    * @returns The file name of the diagram.
    */
    public fileName() {
        return document.getElementById('diagramName').innerHTML;
    };

    /**
    * Converts a position string to an offset point model.
    * @param position The position string to convert.
    * @returns The corresponding point model.
    */

    public getOffset(position: string): PointModel {
        switch (position.toLowerCase()) {
            case 'topleft':
                return { x: 0, y: 0 };
            case 'topcenter':
                return { x: 0.5, y: 0 };
            case 'topright':
                return { x: 1, y: 0 };
            case 'middleleft':
                return { x: 0, y: 0.5 };
            default:
                return { x: 0.5, y: 0.5 };
            case 'middleright':
                return { x: 1, y: 0.5 };
            case 'bottomleft':
                return { x: 0, y: 1 };
            case 'bottomcenter':
                return { x: 0.5, y: 1 };
            case 'bottomright':
                return { x: 1, y: 1 };
        }
    };

    /**
    * Enables or disables menu items in the arrange menu based on selection.
    * @param selectedItem The currently selected item model in the diagram.
    */
    public enableArrangeMenuItems(selectedItem: SelectorViewModel): void {
        var contextInstance = document.getElementById('editContextMenu');
        let diagram = (document.getElementById("diagram") as any).ej2_instances[0];
        var contextMenu = (contextInstance as any).ej2_instances[0];
        for (var i = 0; i < contextMenu.items.length; i++) {
            contextMenu.enableItems([contextMenu.items[i].text], false);
        }
        var objects = ((diagram.selectedItems.nodes as NodeModel) as any).concat(diagram.selectedItems.connectors);
        if (objects.length > 0) {
            contextMenu.enableItems(['Cut', 'Copy', 'Delete', 'Order Commands', 'Rotate']);
        }
        if (diagram.historyManager.undoStack.length > 0) {
            contextMenu.enableItems(['Undo']);
        }
        if (diagram.historyManager.redoStack.length > 0) {
            contextMenu.enableItems(['Redo']);
        }
        if ((diagram.commandHandler.clipboardData.pasteIndex !== undefined
            && diagram.commandHandler.clipboardData.clipObject !== undefined)) {
            contextMenu.enableItems(['Paste']);
        }
    }

    /**
     * Retrieves the dimensions of a standard paper size.
     * @param paperName The name of the paper size.
     * @returns The dimensions of the specified paper size.
     */
    public getPaperSize(paperName: string): PaperSize {
        let paperSize: PaperSize = new PaperSize();
        switch (paperName) {
            case 'Letter':
                paperSize.pageWidth = 816;
                paperSize.pageHeight = 1056;
                break;
            case 'Legal':
                paperSize.pageWidth = 816;
                paperSize.pageHeight = 1344;
                break;
            case 'Tabloid':
                paperSize.pageWidth = 1056;
                paperSize.pageHeight = 1632;
                break;
            case 'A3':
                paperSize.pageWidth = 1122;
                paperSize.pageHeight = 1587;
                break;
            case 'A4':
                paperSize.pageWidth = 793;
                paperSize.pageHeight = 1122;
                break;
            case 'A5':
                paperSize.pageWidth = 559;
                paperSize.pageHeight = 793;
                break;
            case 'A6':
                paperSize.pageWidth = 396;
                paperSize.pageHeight = 559;
                break;
        }
        return paperSize;
    }
}