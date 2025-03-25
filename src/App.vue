
<template>
  <div>
    <div style="display: none">
      <input type="file" id="fileupload" name="UploadFiles" />
    </div>

    <ejs-contextmenu
      id="toolcontextmenu"
      :items="dropDownDataSources.toolMenuItems"
      :animationSettings="dialogAnimationSettings"
      @open="toolContextMenuOpen"
      cssClass="toolMenu"
      :beforeClose="arrangeMenuBeforeClose"
      @select="menuClick"
    ></ejs-contextmenu>

    <ejs-contextmenu
      id="arrangeContextMenu"
      :items="dropDownDataSources.arrangeMenuItems"
      :animationSettings="dialogAnimationSettings"
      @open="arrangeContextMenuOpen"
      cssClass="arrangeMenu"
      :beforeClose="arrangeMenuBeforeClose"
      @select="menuClick"
    ></ejs-contextmenu>

    <div class="diagrambuilder-container">
      <div class="header navbar">
        <div class="db-header-container">
          <div class="db-diagram-name-container">
            <span
              id="diagramName"
              style="
                width: 250px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              "
              class="db-diagram-name"
              @click="renameDiagram"
              >Untitled Diagram</span
            >
            <input
              id="diagramEditable"
              type="text"
              class="db-diagram-name"
              @keydown="diagramNameKeyDown"
              @focusout="diagramNameChange"
            />
            <span
              id="diagramreport"
              class="db-diagram-name db-save-text"
            ></span>
          </div>
          <div class="db-menu-container">
            <div class="db-menu-style">
              <ejs-dropdownbutton
                id="btnFileMenu"
                cssClass="db-dropdown-menu"
                :items="dropDownDataSources.fileMenuItems"
                @select="menuClick"
                :beforeOpen="arrangeMenuBeforeOpen"
                :beforeClose="arrangeMenuBeforeClose"
                :beforeItemRender="beforeItemRender"
                >File
              </ejs-dropdownbutton>
            </div>
            <div class="db-menu-style">
              <ejs-dropdownbutton
                id="btnEditMenu"
                cssClass="db-dropdown-menu"
                :items="dropDownDataSources.editMenuItems"
                @select="menuClick"
                :beforeOpen="arrangeMenuBeforeOpen"
                :beforeClose="arrangeMenuBeforeClose"
                :beforeItemRender="beforeItemRender"
                >Edit</ejs-dropdownbutton
              >
            </div>
            <div class="db-menu-style">
              <ejs-dropdownbutton
                id="btnDesignMenu"
                cssClass="db-dropdown-menu"
                :items="dropDownDataSources.arrangeMenuItems"
                @select="menuClick"
                :beforeOpen="arrangeMenuBeforeOpen"
                :beforeClose="arrangeMenuBeforeClose"
                :beforeItemRender="beforeItemRender"
                target=".e-contextmenu-wrapper.arrangeMenu"
                >Design
              </ejs-dropdownbutton>
            </div>
            <div class="db-menu-style">
              <ejs-dropdownbutton
                id="btnSelectMenu"
                cssClass="db-dropdown-menu"
                :items="dropDownDataSources.selectMenuItems"
                @select="menuClick"
                :beforeOpen="arrangeMenuBeforeOpen"
                :beforeClose="arrangeMenuBeforeClose"
                :beforeItemRender="beforeItemRender"
                >Select
              </ejs-dropdownbutton>
            </div>
            <div class="db-menu-style">
              <ejs-dropdownbutton
                id="btnToolMenu"
                cssClass="db-dropdown-menu"
                :items="dropDownDataSources.toolMenuItems"
                @select="menuClick"
                :beforeOpen="arrangeMenuBeforeOpen"
                :beforeClose="arrangeMenuBeforeClose"
                :beforeItemRender="beforeItemRender"
                target=".e-contextmenu-wrapper.toolMenu"
                >Tool
              </ejs-dropdownbutton>
            </div>
            <div class="db-menu-style">
              <ejs-dropdownbutton
                id="btnViewMenu"
                cssClass="db-dropdown-menu"
                :items="dropDownDataSources.viewMenuItems"
                @select="menuClick"
                :beforeOpen="arrangeMenuBeforeOpen"
                :beforeClose="arrangeMenuBeforeClose"
                :beforeItemRender="beforeItemRender"
                >View
              </ejs-dropdownbutton>
            </div>
          </div>
        </div>

        <div class="db-toolbar-editor">
          <div class="db-toolbar-container">
            <ejs-toolbar
              id="toolbarEditor"
              overflowMode="Scrollable"
              :created="toolbarCreated"
              @clicked="toolbarEditorClick"
            >
              <e-items>
                <!-- Undo -->
                <e-item
                  prefixIcon="sf-icon-undo tb-icons"
                  tooltipText="Undo"
                  cssClass="tb-item-start tb-item-undo"
                ></e-item>

                <!-- Redo -->
                <e-item
                  prefixIcon="sf-icon-redo tb-icons"
                  tooltipText="Redo"
                  cssClass="tb-item-end tb-item-redo"
                ></e-item>

                <e-item type="Separator"></e-item>

                <!-- Pan Tool -->
                <e-item
                  prefixIcon="sf-icon-pan tb-icons"
                  tooltipText="Pan Tool"
                  cssClass="tb-item-start pan-item"
                ></e-item>

                <!-- Select Tool -->
                <e-item
                  prefixIcon="sf-icon-pointer tb-icons"
                  tooltipText="Select Tool"
                  cssClass="tb-item-middle tb-item-selected"
                ></e-item>
                
                <e-item
                  tooltipText="Connector Tool"
                  cssClass="tb-item-middle tb-dropdown-btn-icon"
                  :template="'drawConnectorTemplate'"
                ></e-item>
                <template v-slot:drawConnectorTemplate>
                  <div>
                    <ejs-dropdownbutton
                      id="conTypeBtn"
                      :items="dropDownDataSources.conTypeItems"
                      iconCss="sf-icon-orthogonal_line"
                      @select="menuClick"
                    ></ejs-dropdownbutton>
                  </div>
                </template>

                <!-- Text Tool -->
                <e-item
                  prefixIcon="sf-icon-text tb-icons"
                  tooltipText="Text Tool"
                  cssClass="tb-item-end"
                ></e-item>

                <!-- Group -->
                <e-item
                  prefixIcon="sf-icon-group tb-icons"
                  :visible="false"
                  align="Center"
                  tooltipText="Group"
                  cssClass="tb-item-start tb-item-align-category"
                ></e-item>

                <e-item
                  type="Separator"
                  align="Center"
                  :visible="false"
                ></e-item>

                <!-- Align Tools -->
                <e-item
                  prefixIcon="sf-icon-align_left tb-icons"
                  :visible="false"
                  align="Center"
                  tooltipText="Align Left"
                  cssClass="tb-item-start tb-item-align-category"
                ></e-item>
                <e-item
                  prefixIcon="sf-icon-align_center tb-icons"
                  :visible="false"
                  align="Center"
                  tooltipText="Align Center"
                  cssClass="tb-item-middle tb-item-align-category"
                ></e-item>
                <e-item
                  prefixIcon="sf-icon-align_right tb-icons"
                  :visible="false"
                  align="Center"
                  tooltipText="Align Right"
                  cssClass="tb-item-middle tb-item-align-category"
                ></e-item>
                <e-item
                  prefixIcon="sf-icon-align_top tb-icons"
                  :visible="false"
                  align="Center"
                  tooltipText="Align Top"
                  cssClass="tb-item-middle tb-item-align-category"
                ></e-item>
                <e-item
                  prefixIcon="sf-icon-align_middle tb-icons"
                  :visible="false"
                  align="Center"
                  tooltipText="Align Middle"
                  cssClass="tb-item-middle tb-item-align-category"
                ></e-item>
                <e-item
                  prefixIcon="sf-icon-align_bottom tb-icons"
                  :visible="false"
                  align="Center"
                  tooltipText="Align Bottom"
                  cssClass="tb-item-middle tb-item-align-category"
                ></e-item>

                <!-- Distribute Tools -->
                <e-item
                  prefixIcon="sf-icon-distribute_vertical tb-icons"
                  :visible="false"
                  align="Center"
                  tooltipText="Distribute Objects Vertically"
                  cssClass="tb-item-middle tb-item-space-category"
                ></e-item>
                <e-item
                  prefixIcon="sf-icon-distribute_horizontal tb-icons"
                  :visible="false"
                  align="Center"
                  tooltipText="Distribute Objects Horizontally"
                  cssClass="tb-item-end tb-item-space-category"
                ></e-item>

                <e-item
                  type="Separator"
                  align="Center"
                  :visible="false"
                ></e-item>

                <!-- Order Tools -->
                <e-item
                  prefixIcon="sf-icon-bring-forward tb-icons"
                  align="Center"
                  :visible="false"
                  tooltipText="Bring Forward"
                  cssClass="tb-item-start tb-item-lock-category"
                ></e-item>
                <e-item
                  prefixIcon="sf-icon-bring-to-front tb-icons"
                  align="Center"
                  :visible="false"
                  tooltipText="Bring To Front"
                  cssClass="tb-item-middle tb-item-lock-category"
                ></e-item>
                <e-item
                  prefixIcon="sf-icon-send-backward tb-icons"
                  align="Center"
                  :visible="false"
                  tooltipText="Send Backward"
                  cssClass="tb-item-middle tb-item-lock-category"
                ></e-item>
                <e-item
                  prefixIcon="sf-icon-send-to-back tb-icons"
                  align="Center"
                  :visible="false"
                  tooltipText="Send To Back"
                  cssClass="tb-item-end tb-item-lock-category"
                ></e-item>

                <e-item
                  type="Separator"
                  align="Center"
                  :visible="false"
                ></e-item>

                <!-- Lock -->
                <e-item
                  prefixIcon="sf-icon-lock tb-icons"
                  align="Center"
                  :visible="false"
                  tooltipText="Lock"
                  cssClass="tb-item-start tb-item-lock-category"
                ></e-item>

                <!-- Delete -->
                <e-item
                  prefixIcon="sf-icon-delete tb-icons"
                  align="Center"
                  :visible="false"
                  tooltipText="Delete"
                  cssClass="tb-item-end tb-item-lock-category"
                ></e-item>

                <e-item
                  type="Separator"
                  align="Center"
                  :visible="false"
                ></e-item>
                <e-item type="Separator" :visible="false"></e-item>
                <e-item
                  align="Right"
                  cssClass="tb-item-end tb-zoom-dropdown-btn"
                  :template="'dropdownTemplate'"
                >
                </e-item>
                <template v-slot:dropdownTemplate>
                  <div>
                    <ejs-dropdownbutton
                      id="btnZoomIncrement"
                      :items="dropDownDataSources.zoomMenuItems"
                      @select="zoomChange($event)"
                      :content="selectedItem.scrollSettings.currentZoom"
                    ></ejs-dropdownbutton>
                  </div>
                </template>
                <e-item
                  tooltipText="Hide property"
                  align="Right"
                  :template="'hidePropertyTemplate'"
                >
                </e-item>
                <template v-slot:hidePropertyTemplate>
                  <div>
                    <ejs-button
                      id="hideProperty"
                      @click="hideElements()"
                      iconCss="sf-icon-properties"
                      isPrimary="true"
                    ></ejs-button>
                  </div>
                </template>
              </e-items>
            </ejs-toolbar>
          </div>
        </div>
      </div>
      <div class="row content">
        <div class="sidebar show-overview">
          <div class="db-palette-parent">
            <ejs-symbolpalette
              id="symbolpalette"
              ref="paletteObj"
              width="100%"
              height="100%"
              :palettes="palettes.palettes"
              :enableSearch="true"
              :getSymbolInfo="palettes.getSymbolInfo"
              :symbolMargin="palettes.symbolMargin"
              :getNodeDefaults="palettes.setPaletteNodeDefaults"
            >
            </ejs-symbolpalette>
          </div>
        </div>
        <div class="main-content" role="main">
          <div class="db-diagram-container">
            <div id="diagramContainerDiv" class="db-current-diagram-container">
              <ejs-diagram
                id="diagram"
                ref="diagramInstanceRef"
                :width="width"
                :height="height"
                :nodes="nodes"
                :connectors="connectors"
                :pageSettings="pageSettings"
                :snapSettings="snapSettings"
                :rulerSettings="rulerSettings"
                :contextMenuSettings="contextMenu"
                :getNodeDefaults="getNodeDefaults"
                :getConnectorDefaults="getConnectorDefaults"
                :drawingObject="drawingObject"
                :scrollSettings="scrollSettings"
                :created="created"
                :contextMenuOpen="(args) => diagramEvents.contextMenuOpen(args)"
                :contextMenuClick="(args) => diagramEvents.contextMenuClick(args) "
                :onUserHandleMouseDown="(args) => diagramEvents.userHandleClick(args)"
                :selectionChange="(args) => diagramEvents.selectionChange(args)"
                :collectionChange="(args) => diagramEvents.collectionChange(args)"
                :positionChange="(args) => diagramEvents.positionChange(args)"
                :rotateChange="(args) => diagramEvents.rotateChange(args)"
                :sizeChange="(args) => diagramEvents.sizeChange(args)"
                :historyChange="(args) => diagramEvents.historyChange(args)"
                :dragEnter="(args) => diagramEvents.dragEnter(args)"
                :scrollChange="(args)=> diagramEvents.scrollChange(args)"
              ></ejs-diagram>
            </div>
          </div>
          <div class="db-property-editor-container" style="overflow: auto">
            <div
              id="generalDiagramContainer"
              class="db-general-diagram-prop-container"
            >
              <div
                id="diagramPropertyContainer"
                class="db-diagram-prop-container"
              >
                <div class="row db-prop-header-text">
                  Page Settings
                  <ejs-button
                    class="close"
                    @click="hideElements('hide-properties', diagram)"
                    ><i
                      style="width: 20px; height: 20px; font-size: 20px"
                      class="sf-icon-close"
                    ></i
                  ></ejs-button>
                </div>
                <div
                  class="db-prop-separator"
                  style="background-color: #b5b5b5; margin-bottom: 10px"
                ></div>
                <div class="row db-prop-row">
                  <div class="col-xs-12 db-col-left">
                    <span class="db-prop-text-style">Format</span>
                    <ejs-dropdownlist
                      id="pageSettingsList"
                      :dataSource="dropDownDataSources.paperList"
                      v-on:change="
                        diagramPropertyBinding.paperListChange($event)
                      "
                      :fields="dropdownListFields"
                      :value="selectedItem.pageSettings.paperSize"
                    ></ejs-dropdownlist>
                  </div>
                </div>
                <div class="row" id="pageOrientation" style="margin-top: 10px">
                  <div class="row db-prop-row">
                    <div class="col-xs-6 db-col-right">
                      <span class="db-prop-text-style">Orientation</span>
                    </div>
                  </div>
                  <div class="col-xs-6 db-col-left">
                    <ejs-button
                      id="pagePortrait"
                      isPrimary="true"
                      isToggle="true"
                      style="font-size: 10px"
                      cssClass="e-flat e-primary"
                      iconCss="sf-icon-portrait"
                      name="pageSettings"
                      @click="
                        diagramPropertyBinding.pageOrientationChange($event)
                      "
                      >Portrait</ejs-button
                    >
                  </div>
                  <div class="col-xs-6 db-col-right">
                    <ejs-button
                      id="pageLandscape"
                      isPrimary="true"
                      isToggle="true"
                      style="font-size: 10px"
                      cssClass="e-flat e-primary e-active"
                      iconCss="sf-icon-landscape"
                      name="pageSettings"
                      @click="
                        diagramPropertyBinding.pageOrientationChange($event)
                      "
                      >LandScape</ejs-button
                    >
                  </div>
                </div>
                <div
                  class="row db-prop-row"
                  id="pageDimension"
                  style="display: none"
                >
                  <div class="col-xs-6 db-col-left">
                    <div class="db-text-container">
                      <div class="db-text">
                        <span>W</span>
                      </div>
                      <div class="db-text-input">
                        <ejs-numerictextbox
                          id="pageWidth"
                          min="100"
                          format="n0"
                          :value="selectedItem.pageSettings.pageWidth"
                          v-on:change="
                            diagramPropertyBinding.pageDimensionChange($event)
                          "
                        ></ejs-numerictextbox>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-6 db-col-right">
                    <div class="db-text-container">
                      <div class="db-text">
                        <span>H</span>
                      </div>
                      <div class="db-text-input">
                        <ejs-numerictextbox
                          id="pageHeight"
                          min="100"
                          format="n0"
                          :value="selectedItem.pageSettings.pageHeight"
                          v-on:change="
                            diagramPropertyBinding.pageDimensionChange($event)
                          "
                        ></ejs-numerictextbox>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row db-prop-row" style="margin-top: 10px">
                  <div class="col-xs-6 db-col-left">
                    <span class="db-prop-text-style">Background</span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-6 db-col-left">
                    <div class="db-color-container">
                      <div class="db-color-input">
                        <ejs-colorpicker
                          type="color"
                          mode="Palette"
                          :showButtons="false"
                          width="100%"
                          :value="selectedItem.pageSettings.backgroundColor"
                          v-on:change="
                            diagramPropertyBinding.pageBackgroundChange1($event)
                          "
                        ></ejs-colorpicker>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row db-prop-row" style="margin-top: 10px">
                  <ejs-checkbox
                    id="showPageBreaks"
                    label="Page Breaks"
                    :checked="selectedItem.pageSettings.pageBreaks"
                    v-on:change="
                      diagramPropertyBinding.pageBreaksChange($event)
                    "
                  >
                  </ejs-checkbox>
                </div>
              </div>
              <div
                id="nodePropertyContainer"
                class="db-node-prop-container"
                style="display: none"
              >
                <div class="db-node-behaviour-prop">
                  <div class="row db-prop-header-text">
                    Properties
                    <ejs-button
                      class="close"
                      @click="hideElements('hide-properties', diagram)"
                    >
                      <i
                        style="width: 20px; height: 20px; font-size: 20px"
                        class="sf-icon-close"
                      ></i>
                    </ejs-button>
                  </div>
                  <div
                    class="db-prop-separator"
                    style="background-color: #b5b5b5; margin-bottom: 15px"
                  ></div>
                  <div class="row db-prop-header-text">Dimensions</div>
                  <div class="row db-prop-row">
                    <div
                      class="col-xs-6 db-col-left"
                      style="width: 97px; padding-right: 5px"
                    >
                      <div class="db-text-container">
                        <div class="db-text">
                          <span>X</span>
                        </div>
                        <div class="db-text-input">
                          <ejs-numerictextbox
                            style="width: 72px"
                            id="nodeOffsetX"
                            format="n0"
                            v-model="selectedItem.nodeProperties.offsetX"
                          ></ejs-numerictextbox>
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-6 db-col-right" style="width: 97px">
                      <div class="db-text-container">
                        <div class="db-text">
                          <span>Y</span>
                        </div>
                        <div class="db-text-input">
                          <ejs-numerictextbox
                            style="width: 72px"
                            id="nodeOffsetY"
                            format="n0"
                            v-model="selectedItem.nodeProperties.offsetY"
                          ></ejs-numerictextbox>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row db-prop-row">
                    <div
                      class="col-xs-6 db-col-left"
                      style="width: 97px; padding-right: 5px"
                    >
                      <div class="db-text-container">
                        <div class="db-text">
                          <span>W</span>
                        </div>
                        <div class="db-text-input">
                          <ejs-numerictextbox
                            style="width: 72px"
                            id="nodeWidth"
                            format="n0"
                            v-model="selectedItem.nodeProperties.width"
                          ></ejs-numerictextbox>
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-6 db-col-right" style="width: 97px">
                      <div class="db-text-container">
                        <div class="db-text">
                          <span>H</span>
                        </div>
                        <div class="db-text-input">
                          <ejs-numerictextbox
                            style="width: 72px"
                            id="nodeHeight"
                            format="n0"
                            v-model="selectedItem.nodeProperties.height"
                          ></ejs-numerictextbox>
                        </div>
                      </div>
                    </div>
                    <div
                      class="col-xs-2 db-col-left"
                      style="width: 20px; padding-left: 7px"
                    >
                      <ejs-button
                        style="height: 26px; background-color: #ffff"
                        id="aspectRatioBtn"
                        @click="aspectClick()"
                        iconCss="sf-icon-unlock"
                        isToggle="true"
                        cssClass="e-flat"
                      ></ejs-button>
                    </div>
                  </div>
                  <div class="row db-prop-row">
                    <div class="col-xs-6 db-col-left" style="width: 97px">
                      <div class="db-text-container">
                        <div class="db-text">
                          <ejs-button
                            style="margin: -5px 0px 0px 0px"
                            iconCss="sf-icon-rotate tb-icons"
                          ></ejs-button>
                        </div>
                        <div class="db-text-input">
                          <ejs-numerictextbox
                            id="nodeRotateAngle"
                            style="width: 72px"
                            format="n0"
                            v-model="selectedItem.nodeProperties.rotateAngle"
                          ></ejs-numerictextbox>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="db-prop-separator"
                    style="background-color: #b5b5b5; margin-bottom: 15px"
                  ></div>
                  <div class="row db-prop-row">
                    <div class="col-xs-6 db-col-left">
                      <ejs-button
                        style="font-size: 10px"
                        id="insertlink"
                        iconCss="sf-icon-insert_link"
                        tooltipText="Insert Link"
                        cssClass="e-outline"
                        isPrimary="true"
                        @click="toolbarInsertClick($event)"
                        >Insert link</ejs-button
                      >
                    </div>
                  </div>
                  <div
                    class="db-prop-separator"
                    style="background-color: #b5b5b5"
                  ></div>
                </div>
                <div id="nodeStyleProperties" class="db-node-style-prop">
                  <div class="row db-background-style">
                    <div
                      class="col-xs-6 db-col-right"
                      style="margin-bottom: 3px"
                    >
                      <span class="db-prop-text-style">Background Type</span>
                    </div>
                    <div class="row db-prop-row">
                      <div class="col-xs-12 db-col-left">
                        <ejs-dropdownlist
                          type="text"
                          :index="0"
                          @select="
                            diagramPropertyBinding.backgroundTypeSelect($event)
                          "
                          :dataSource="dropDownDataSources.backgroundTypes"
                          id="backgroundTypeDropdown"
                        ></ejs-dropdownlist>
                      </div>
                    </div>
                    <div
                      id="gradientStyle"
                      class="row db-prop-row db-gradient-style-hide"
                    >
                      <div class="col-xs-4 db-col-left" style="width: 81px">
                        <div class="db-color-container">
                          <div class="db-color-input">
                            <ejs-colorpicker
                              :showButtons="false"
                              v-model="selectedItem.nodeProperties.fillColor"
                              mode="Palette"
                              id="nodeFillColor"
                              type="color"
                            ></ejs-colorpicker>
                          </div>
                        </div>
                      </div>
                      <div class="col-xs-2 db-col-center">
                        <ejs-dropdownbutton
                          iconCss="sf-icon-gradient-alignment"
                          style="height: 26px; width: 58px"
                          @select="
                            diagramPropertyBinding.gradientDirectionChange(
                              $event
                            )
                          "
                          :items="dropDownDataSources.gradientDirections"
                          id="gradientDirection"
                        ></ejs-dropdownbutton>
                      </div>
                      <div
                        class="col-xs-4 db-col-right"
                        style="margin-left: 28px"
                      >
                        <div class="db-color-container">
                          <div class="db-color-input">
                            <ejs-colorpicker
                              v-model="
                                selectedItem.nodeProperties.gradientColor
                              "
                              :showButtons="false"
                              mode="Palette"
                              id="nodeGradientColor"
                              type="color"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row db-border-style">
                    <div class="row db-prop-header-text db-border-style-header">
                      Border/Line Styles
                      <button
                        class="close"
                        @click="
                          utilityMethods.hideElements(
                            'hide-properties',
                            diagram
                          )
                        "
                      >
                        <i
                          style="width: 20px; height: 20px; font-size: 20px"
                          class="sf-icon-close"
                        ></i>
                      </button>
                    </div>
                    <div
                      class="db-prop-separator"
                      style="background-color: #b5b5b5; margin-bottom: 15px"
                    ></div>
                    <div class="row db-prop-row">
                      <div class="col-xs-6 db-col-right">
                        <span class="db-prop-text-style">Border Type</span>
                      </div>
                      <div
                        class="col-xs-2 db-col-left"
                        style="margin-left: -6px"
                      >
                        <span class="db-prop-text-style">Color</span>
                      </div>
                      <div
                        class="col-xs-2 db-col-center"
                        style="margin-left: 6px"
                      >
                        <span class="db-prop-text-style">Thickness</span>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-xs-6 db-col-right" style="width: 90px">
                        <ejs-dropdownlist
                          id="nodeBorderStyle"
                          v-model="selectedItem.nodeProperties.strokeStyle"
                          :dataSource="dropDownDataSources.borderStyles"
                          popupWidth="160px"
                          :fields="dropdownListFields"
                          :itemTemplate="'iTemplate'"
                          :valueTemplate="'vTemplate'"
                        >
                          <template v-slot:iTemplate="{ data }">
                            <div class="db-ddl-template-style">
                              <span :class="data.className"></span>
                            </div>
                          </template>
                          <template v-slot:vTemplate="{ data }">
                            <div class="db-ddl-template-style">
                              <span :class="data.className"></span>
                            </div>
                          </template>
                        </ejs-dropdownlist>
                      </div>
                      <div class="col-xs-2 db-col-center">
                        <div
                          class="db-color-container"
                          style="width: 55px; margin-left: 0px"
                        >
                          <div class="db-color-input">
                            <ejs-colorpicker
                              v-model="selectedItem.nodeProperties.strokeColor"
                              :showButtons="false"
                              mode="Palette"
                              id="nodeStrokeColor"
                              type="color"
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        class="col-xs-4 db-col-center"
                        style="width: 70px; margin-left: 25px"
                      >
                        <div class="db-text-container">
                          <div class="db-text-input">
                            <ejs-numerictextbox
                              v-model="selectedItem.nodeProperties.strokeWidth"
                              style="width: 66px"
                              :min="0.5"
                              :step="0.5"
                              :max="20"
                              id="nodeStrokeWidth"
                              type="text"
                            ></ejs-numerictextbox>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row db-prop-row">
                      <div
                        class="col-xs-2 db-col-right db-prop-text-style"
                        style="margin-right: 15px; padding-top: 6px"
                      >
                        <span class="db-prop-text-style">Opacity</span>
                      </div>
                      <div
                        class="col-xs-8 db-col-left"
                        style="width: 130px; padding-right: 10px"
                      >
                        <ejs-slider
                          id="nodeOpacitySlider"
                          v-model="selectedItem.nodeProperties.opacity"
                          :min="0"
                          :max="100"
                          :step="10"
                          type="MinRange"
                        ></ejs-slider>
                      </div>
                      <div class="col-xs-2 db-col-right">
                        <input
                          v-model="selectedItem.nodeProperties.opacityText"
                          type="text"
                          readonly="true"
                          class="db-readonly-input"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                id="connectorPropertyContainer"
                class="db-connector-prop-container"
                style="display: none"
              >
                <div class="row db-prop-header-text">
                  Connector Properties
                  <button
                    class="close"
                    @click="
                      utilityMethods.hideElements('hide-properties', diagram)
                    "
                  >
                    <i
                      style="width: 20px; height: 20px; font-size: 20px"
                      class="sf-icon-close"
                    ></i>
                  </button>
                </div>
                <div
                  class="db-prop-separator"
                  style="background-color: #b5b5b5; margin-bottom: 15px"
                ></div>

                <div class="row db-prop-row">
                  <div class="col-xs-6 db-col-left db-prop-text-style">
                    <span class="db-prop-text-style">Connector Type</span>
                  </div>
                  <div
                    class="col-xs-4 db-col-left db-prop-text-style"
                    style="margin-left: 19px"
                  >
                    <span class="db-prop-text-style">Color</span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-6 db-col-left">
                    <ejs-dropdownlist
                      v-model="selectedItem.connectorProperties.lineType"
                      :dataSource="dropDownDataSources.lineTypes"
                      :fields="dropdownListFields"
                    />
                  </div>
                  <div class="col-xs-4 db-col-left">
                    <div
                      class="db-color-container"
                      style="width: 77px; margin-left: 18px"
                    >
                      <div class="db-color-input">
                        <ejs-colorpicker
                          id="lineColor"
                          :showButtons="false"
                          mode="Palette"
                          type="color"
                          v-model="selectedItem.connectorProperties.lineColor"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row db-prop-row">
                  <div class="col-xs-6 db-col-left db-prop-text-style">
                    <span class="db-prop-text-style">Stroke Style</span>
                  </div>
                  <div
                    class="col-xs-4 db-col-right db-prop-text-style"
                    style="margin-left: 18px"
                  >
                    <span class="db-prop-text-style">Thickness</span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-6 db-col-left">
                    <ejs-dropdownlist
                      id="lineStyle"
                      v-model="selectedItem.connectorProperties.lineStyle"
                      :dataSource="dropDownDataSources.lineStyles"
                      popupWidth="160px"
                      :fields="dropdownListFields"
                      :itemTemplate="'iTemplate'"
                      :valueTemplate="'vTemplate'"
                    >
                      <template v-slot:iTemplate="{ data }">
                        <div class="db-ddl-template-style">
                          <span :class="data.className"></span>
                        </div>
                      </template>
                      <template v-slot:vTemplate="{ data }">
                        <div class="db-ddl-template-style">
                          <span :class="data.className"></span>
                        </div>
                      </template>
                    </ejs-dropdownlist>
                  </div>
                  <div class="col-xs-6 db-col-right">
                    <div
                      class="db-text-container"
                      style="width: 77px; margin-left: 20px"
                    >
                      <div class="db-text-input">
                        <ejs-numerictextbox
                          min="0.5"
                          style="width: 74px"
                          :step="0.5"
                          v-model="selectedItem.connectorProperties.lineWidth"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row db-prop-row">
                  <div class="col-xs-6 db-col-left db-prop-text-style">
                    <span class="db-prop-text-style">Start Arrow</span>
                  </div>
                  <div
                    class="col-xs-4 db-col-right db-prop-text-style"
                    style="margin-left: 19px"
                  >
                    <span class="db-prop-text-style">Size</span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-6 db-col-left">
                    <ejs-dropdownlist
                      v-model="selectedItem.connectorProperties.sourceType"
                      :dataSource="dropDownDataSources.decoratorList"
                      :fields="dropdownListFields"
                    />
                  </div>
                  <div class="col-xs-6 db-col-right">
                    <div
                      class="db-text-container"
                      style="width: 77px; margin-left: 20px"
                    >
                      <div class="db-text-input">
                        <ejs-numerictextbox
                          style="width: 74px"
                          format="n0"
                          min="1"
                          :step="1"
                          v-model="selectedItem.connectorProperties.sourceSize"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row db-prop-row">
                  <div class="col-xs-6 db-col-left db-prop-text-style">
                    <span class="db-prop-text-style">End Arrow</span>
                  </div>
                  <div
                    class="col-xs-4 db-col-right db-prop-text-style"
                    style="margin-left: 19px"
                  >
                    <span class="db-prop-text-style">Size</span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-6 db-col-left">
                    <ejs-dropdownlist
                      v-model="selectedItem.connectorProperties.targetType"
                      :dataSource="dropDownDataSources.decoratorList"
                      :fields="dropdownListFields"
                    />
                  </div>
                  <div class="col-xs-6 db-col-right">
                    <div
                      class="db-text-container"
                      style="width: 77px; margin-left: 20px"
                    >
                      <div class="db-text-input">
                        <ejs-numerictextbox
                          min="1"
                          format="n0"
                          style="width: 74px"
                          :step="1"
                          v-model="selectedItem.connectorProperties.targetSize"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row db-prop-row">
                  <div class="col-xs-6 db-col-left" style="margin-top: 5px">
                    <ejs-checkbox
                      id="lineJump"
                      label="Bridging"
                      v-model="selectedItem.connectorProperties.lineJump"
                    />
                  </div>
                  <div
                    class="col-xs-6 db-col-right"
                    id="lineJumpSizeDiv"
                    style="display: none"
                  >
                    <div
                      class="db-text-container"
                      style="width: 77px; margin-left: 20px"
                    >
                      <div class="db-text-input">
                        <ejs-numerictextbox
                          style="width: 74px"
                          :min="5"
                          :step="1"
                          v-model="
                            selectedItem.connectorProperties.lineJumpSize
                          "
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row db-prop-row">
                  <div
                    class="col-xs-2 db-col-right db-prop-text-style"
                    style="padding-top: 6px"
                  >
                    <span class="db-prop-text-style">Opacity</span>
                  </div>
                  <div
                    class="col-xs-8 db-col-left"
                    style="padding-right: 15px; padding-left: 15px"
                  >
                    <ejs-slider
                      id="default"
                      v-model="selectedItem.connectorProperties.opacity"
                      :min="0"
                      :max="100"
                      :step="10"
                      type="MinRange"
                    />
                  </div>
                  <div class="col-xs-2 db-col-right">
                    <input
                      type="text"
                      :value="selectedItem.connectorProperties.opacityText"
                      readonly="true"
                      class="db-readonly-input"
                    />
                  </div>
                </div>
              </div>
              <div
                id="textPropertyContainer"
                class="db-text-prop-container"
                style="display: none"
              >
                <div
                  class="db-prop-separator"
                  style="background-color: #b5b5b5"
                ></div>
                <div class="col-xs-8 db-col-left db-prop-text-style">
                  <span class="db-prop-text-style">Text</span>
                </div>
                <div class="col-xs-4 db-col-left db-prop-text-style">
                  <span class="db-prop-text-style">Size</span>
                </div>
                <div class="row db-prop-row">
                  <div class="col-xs-8 db-col-left" style="width: 145px">
                    <ejs-dropdownlist
                      :dataSource="dropDownDataSources.fontFamilyList"
                      v-model="selectedItem.textProperties.fontFamily"
                      :fields="dropdownListFields"
                      index="0"
                    ></ejs-dropdownlist>
                  </div>
                  <div class="col-xs-4 db-col-right">
                    <div class="db-text-container">
                      <div class="db-text-input">
                        <ejs-numerictextbox
                          style="width: 73px"
                          :min="5"
                          :format="n0"
                          :step="1"
                          v-model="selectedItem.textProperties.fontSize"
                        ></ejs-numerictextbox>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row db-prop-row">
                  <div
                    class="col-xs-6 db-col-left"
                    id="textPositionDiv"
                    style="width: 145px"
                  >
                    <ejs-dropdownlist
                      id="ddlTextPosition"
                      ref="ddlTextPositionRef"
                      :dataSource="
                        selectedItem.textProperties.textPositionDataSource
                      "
                      type="text"
                      v-model="selectedItem.textProperties.textPosition"
                      v-on:change="
                        diagramPropertyBinding.textPositionChange($event)
                      "
                      :fields="dropdownListFields"
                    ></ejs-dropdownlist>
                  </div>
                  <div
                    class="col-xs-4 db-col-right"
                    id="textColorDiv"
                    style="width: 73px"
                  >
                    <div class="db-color-container">
                      <div class="db-color-input">
                        <ejs-colorpicker
                          v-model="selectedItem.textProperties.fontColor"
                          :showButtons="false"
                          mode="Palette"
                          id="textColor"
                          type="color"
                        ></ejs-colorpicker>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row db-prop-row" style="margin-top: 10px">
                  <div class="col-xs-6 db-col-left">
                    <ejs-toolbar
                      id="toolbarTextStyle"
                      overflowMode="Scrollable"
                      v-on:clicked="
                        diagramPropertyBinding.toolbarTextStyleChange($event)
                      "
                    >
                      <e-items>
                        <e-item
                          prefixIcon="sf-icon-bold tb-icons"
                          tooltipText="Bold"
                          cssClass="tb-item-start"
                        ></e-item>
                        <e-item
                          prefixIcon="sf-icon-italic tb-icons"
                          tooltipText="Italic"
                          cssClass="tb-item-middle"
                        ></e-item>
                        <e-item
                          prefixIcon="sf-icon-underline tb-icons"
                          tooltipText="Underline"
                          cssClass="tb-item-end"
                        ></e-item>
                      </e-items>
                    </ejs-toolbar>
                  </div>
                  <div class="col-xs-6 db-col-right">
                    <ejs-toolbar
                      id="toolbarTextSubAlignment"
                      overflowMode="Scrollable"
                      v-on:clicked="
                        diagramPropertyBinding.toolbarTextSubAlignChange($event)
                      "
                    >
                      <e-items>
                        <e-item
                          prefixIcon="sf-icon-align-left tb-icons"
                          tooltipText="Align Text Left"
                          cssClass="tb-item-start"
                        ></e-item>
                        <e-item
                          prefixIcon="sf-icon-align-center tb-icons"
                          tooltipText="Align Text Center"
                          cssClass="tb-item-middle"
                        ></e-item>
                        <e-item
                          prefixIcon="sf-icon-align-right tb-icons"
                          tooltipText="Align Text Right"
                          cssClass="tb-item-end"
                        ></e-item>
                      </e-items>
                    </ejs-toolbar>
                  </div>
                </div>
                <div class="row db-prop-row" id="toolbarTextAlignmentDiv">
                  <div class="col-xs-6 db-col-left">
                    <ejs-toolbar
                      id="toolbarTextAlignmentLeft"
                      overflowMode="Scrollable"
                      v-on:clicked="
                        diagramPropertyBinding.toolbarTextAlignChange($event)
                      "
                    >
                      <e-items>
                        <e-item
                          prefixIcon="sf-icon-align-text-left tb-icons"
                          tooltipText="Align Right"
                          cssClass="tb-item-start"
                        ></e-item>
                        <e-item
                          prefixIcon="sf-icon-align-text-horizontal-center tb-icons"
                          tooltipText="Align Center"
                          cssClass="tb-item-middle"
                        ></e-item>
                        <e-item
                          prefixIcon="sf-icon-align-text-rignt tb-icons"
                          tooltipText="Align Left"
                          cssClass="tb-item-end"
                        ></e-item>
                      </e-items>
                    </ejs-toolbar>
                  </div>
                  <div class="col-xs-6 db-col-right">
                    <ejs-toolbar
                      id="toolbarTextAlignmentTop"
                      overflowMode="Scrollable"
                      v-on:clicked="
                        diagramPropertyBinding.toolbarTextAlignChange($event)
                      "
                    >
                      <e-items>
                        <e-item
                          prefixIcon="sf-icon-align-text-top tb-icons"
                          tooltipText="Align Top"
                          cssClass="tb-item-start"
                        ></e-item>
                        <e-item
                          prefixIcon="sf-icon-align-text-vertical-center tb-icons"
                          tooltipText="Align Middle"
                          cssClass="tb-item-middle"
                        ></e-item>
                        <e-item
                          prefixIcon="sf-icon-align-text-bottom tb-icons"
                          tooltipText="Align Bottom"
                          cssClass="tb-item-end"
                        ></e-item>
                      </e-items>
                    </ejs-toolbar>
                  </div>
                </div>
                <div class="row db-prop-row">
                  <div
                    class="col-xs-2 db-col-right db-prop-text-style"
                    style="margin-right: 15px; padding-top: 6px"
                  >
                    <span class="db-prop-text-style">Opacity</span>
                  </div>
                  <div
                    class="col-xs-8 db-col-left"
                    style="width: 130px; padding-right: 10px"
                  >
                    <ejs-slider
                      id="opacityTextSlider"
                      v-model="selectedItem.textProperties.opacity"
                      min="0"
                      max="100"
                      :step="10"
                      type="MinRange"
                    ></ejs-slider>
                  </div>
                  <div class="col-xs-2 db-col-right">
                    <input
                      id="textOpacityText"
                      type="text"
                      :value="selectedItem.textProperties.opacityText"
                      class="db-readonly-input"
                      readOnly
                    />
                  </div>
                </div>
                <div
                  class="db-prop-separator"
                  style="background-color: #b5b5b5"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ejs-dialog
      id="exportDialog"
      ref="exportDialogRef"
      width="400px"
      header="Export Diagram"
      :target="dlgTarget"
      isModal="true"
      :animationSettings="dialogAnimationSettings"
      :visible="dialogVisibility"
      showCloseIcon="true"
      :buttons="exportingButtons"
    >
      <div id="exportDialogContent">
        <div class="row">
          <div class="row">File Name</div>
          <div class="row db-dialog-child-prop-row">
            <input type="text" id="exportfileName" :value="selectedItem.exportSettings.fileName" @change="exportFileNameChange"/>
          </div>
        </div>
        <div class="row db-dialog-prop-row">
          <div class="col-xs-6 db-col-left">
            <div class="row">Format</div>
            <div class="row db-dialog-child-prop-row">
              <ejs-dropdownlist
                id="exportFormat"
                :value="selectedItem.exportSettings.format"
                :dataSource="dropDownDataSources.fileFormats"
                :fields="dropdownListFields"
                @change="exportFormatChange"
              ></ejs-dropdownlist>
            </div>
          </div>
          <div class="col-xs-6 db-col-right">
            <div class="row">Region</div>
            <div class="row db-dialog-child-prop-row">
              <ejs-dropdownlist
                id="exportRegion"
                :value="selectedItem.exportSettings.region"
                :dataSource="dropDownDataSources.diagramRegions"
                :fields="dropdownListFields"
                @change="exportRegionChange"
              ></ejs-dropdownlist>
            </div>
          </div>
        </div>
      </div>
    </ejs-dialog>


    <ejs-dialog
      id="hyperlinkDialog"
      ref="hyperlinkDialogRef"
      width="400px"
      header="Insert Link"
      :target="dlgTarget"
      isModal="true"
      :animationSettings="dialogAnimationSettings"
      :visible="dialogVisibility"
      :buttons="hyperlinkButtons"
      showCloseIcon="true"
    >
      <div id="hyperlinkDialogContent">
        <div class="row">
          <div class="row">Enter URL</div>
          <div class="row db-dialog-child-prop-row">
            <input type="text" id="hyperlink" />
          </div>
        </div>
        <div class="row db-dialog-prop-row">
          <div class="row">Link Text (Optional)</div>
          <div class="row db-dialog-child-prop-row">
            <input type="text" id="hyperlinkText" />
          </div>
        </div>
      </div>
    </ejs-dialog>
    <ejs-dialog
      id="fileUploadDialog"
      ref="fileUploadDialog"
      width="500px"
      height="485px"
      header="Upload File"
      :target="dlgTarget"
      isModal="true"
      :animationSettings="dialogAnimationSettings"
      showCloseIcon="true"
      allowDragging="true"
      :visible="dialogVisibility"
    >
      <div id="uploadDialogContent" class="db-upload-content firstPage">
        <div
          id="uploadInformationDiv"
          class="row db-dialog-prop-row"
          style="margin-top: 0px"
        >
          <div class="row">
            <div id="dropArea">
              <span id="dropRegion" class="droparea">
                Drop files here or
                <a href="" id="browseFile">
                  <u>Browse</u>
                </a>
              </span>
              <ejs-uploader
                id="defaultfileupload"
                ref="defaultfileuploadRef"
                :asyncSettings="path"
                :success="onUploadSuccess"
                :allowedExtensions="extensionType"
              ></ejs-uploader>
            </div>
          </div>
        </div>
      </div>
    </ejs-dialog>
  </div>
</template>
<script>
import { ref, reactive, defineComponent } from "vue";
import { formatUnit, closest } from "@syncfusion/ej2-base";
import {
  NodeConstraints,
  DiagramTools,
  SnapConstraints,
  ConnectorConstraints
} from "@syncfusion/ej2-vue-diagrams";
import { DropDownDataSources } from "../src/app/scripts/dropdowndatasource";
import { Palettes } from "../src/app/scripts/palettes";
import {
  DiagramClientSideEvents,
  DiagramPropertyBinding,
} from "../src/app/scripts/events";

import {
  DiagramComponent,
  SymbolPaletteComponent,
  UndoRedo,
  Snapping,
  BpmnDiagrams,
  PrintAndExport,
  ConnectorBridging,
  DiagramContextMenu,
  ControlPointsVisibility,
  BezierSmoothness,
} from "@syncfusion/ej2-vue-diagrams";
import { ContextMenuComponent } from "@syncfusion/ej2-vue-navigations";
import {
  ColorPickerComponent,
  SliderComponent,
  UploaderComponent,
  NumericTextBoxComponent,
} from "@syncfusion/ej2-vue-inputs";
import { DropDownListComponent } from "@syncfusion/ej2-vue-dropdowns";
import {
  ButtonComponent,
  CheckBoxComponent,
} from "@syncfusion/ej2-vue-buttons";
import { DropDownButtonComponent } from "@syncfusion/ej2-vue-splitbuttons";
import {
  ToolbarComponent,
  ItemsDirective,
  ItemDirective,
} from "@syncfusion/ej2-vue-navigations";
import { SelectorViewModel } from "../src/app/scripts/selector";
import { DialogComponent } from "@syncfusion/ej2-vue-popups";

let diagram;

export default defineComponent({
  name: "App",
  components: {
    "ejs-diagram": DiagramComponent,
    "ejs-symbolpalette": SymbolPaletteComponent,
    "ejs-toolbar": ToolbarComponent,
    "e-items": ItemsDirective,
    "e-item": ItemDirective,
    "ejs-dropdownbutton": DropDownButtonComponent,
    "ejs-numerictextbox": NumericTextBoxComponent,
    "ejs-dropdownlist": DropDownListComponent,
    "ejs-button": ButtonComponent,
    "ejs-contextmenu": ContextMenuComponent,
    "ejs-colorpicker": ColorPickerComponent,
    "ejs-slider": SliderComponent,
    "ejs-dialog": DialogComponent,
    "ejs-checkbox": CheckBoxComponent,
    "ejs-uploader": UploaderComponent,
  },
  setup() {
    const width = ref("100%");
    const height = ref("100%");
    const selectedItem = reactive(new SelectorViewModel());
    const diagramEvents = reactive(new DiagramClientSideEvents(selectedItem));
    const diagramPropertyBinding = reactive(
      new DiagramPropertyBinding(selectedItem)
    );
    const dropDownDataSources = reactive(new DropDownDataSources());
    const palettes = new Palettes();
    var defaultupload = ref();
    const dlgTarget = reactive(document.body);
    const dialogVisibility = ref(false);
    const extensionType = ref(".csv");
    const ddlTextPosition = ref();
    const dialogPosition = ref({ X: 100, Y: 112 });
    const isModalDialog = ref(false);
    const dropdownListFields = {
      text: "text",
      value: "value",
    };
    const fileUploadDialog = ref();
    const path = ref({
      saveUrl:
        "https://services.syncfusion.com/vue/production/api/FileUploader/Save",
      removeUrl:
        "https://services.syncfusion.com/vue/production/api/FileUploader/Remove",
    });
    const dialogAnimationSettings = reactive({ effect: "None" });

    const pageSettings = reactive({
      background: { color: "#FFFFFF" },
      width: 600,
      height: 1500,
      margin: { left: 5, top: 5 },
      orientation: "Landscape",
      showPageBreaks: false,
      multiplePage: false,
    });
    const snapSettings = reactive({ constraints: SnapConstraints.All });
    const drawingObject = reactive({
      type: "Orthogonal",
      shape: { type: "Bpmn" },
    });
    const scrollSettings = reactive({
      canAutoScroll: false,
      scrollLimit: "Infinity",
      minZoom: 0.25,
      maxZoom: 30,
    });

    const rulerSettings = reactive({
      showRulers: true,
      dynamicGrid: true,
      horizontalRuler: {
        interval: 10,
        segmentWidth: 100,
        thickness: 25,
        markerColor: "#0078d4",
      },
      verticalRuler: {
        interval: 10,
        segmentWidth: 100,
        thickness: 25,
        markerColor: "#0078d4",
      },
    });
    let isConToolActive = false;
    const contextMenu = reactive({
      show: true,
      items: [
        {
          text: "Copy",
          id: "Copy",
          target: ".e-diagramcontent",
          iconCss: "sf-icon-copy",
        },
        {
          text: "Cut",
          id: "Cut",
          target: ".e-diagramcontent",
          iconCss: "sf-icon-cut",
        },
        {
          text: "Paste",
          id: "Paste",
          target: ".e-diagramcontent",
          iconCss: "sf-icon-paste",
        },
        {
          text: "Delete",
          id: "Delete",
          target: ".e-diagramcontent",
          iconCss: "sf-icon-delete",
        },
        {
          text: "Select All",
          id: "SelectAll",
          target: ".e-diagramcontent",
          iconCss: "e-menu-icon",
        },
        {
          text: "Association",
          id: "Association",
          iconCss: "e-bpmn-icons",
        },
        {
          text: "Sequence",
          id: "Sequence",
          iconCss: "e-bpmn-icons",
        },
        {
          text: "Message Flow",
          id: "MessageFlow",
          iconCss: "e-bpmn-icons",
        },
        {
          text: "Condition type",
          id: "Condition type",
          items: [
            { text: "Default", id: "None", iconCss: "e-bpmn-icons" },
            {
              text: "Conditional",
              id: "Conditional Flow",
              iconCss: "e-bpmn-icons",
            },
            { text: "Normal", id: "Normal Flow", iconCss: "e-bpmn-icons" },
          ],
        },
        {
          text: "Direction",
          id: "Direction",
          items: [
            { text: "Default", id: "None", iconCss: "e-bpmn-icons" },
            { text: "Directional", id: "Directional", iconCss: "e-bpmn-icons" },
            {
              text: "Bi-Directional",
              id: "BiDirectional",
              iconCss: "e-bpmn-icons",
            },
          ],
        },
        {
          text: "Ad-Hoc",
          id: "Adhoc",
          iconCss: "e-adhocs e-bpmn-icons e-adhoc",
        },
        {
          text: "Loop",
          id: "Loop",
          items: [
            {
              text: "None",
              iconCss: "e-loop e-bpmn-icons e-None",
              id: "LoopNone",
            },
            {
              text: "Standard",
              iconCss: "e-loop e-bpmn-icons e-Loop",
              id: "Standard",
            },
            {
              text: "Parallel Multi-Instance",
              iconCss: "e-loop e-bpmn-icons e-ParallelMI",
              id: "ParallelMultiInstance",
            },
            {
              text: "Sequence Multi-Instance",
              iconCss: "e-loop e-bpmn-icons e-SequentialMI",
              id: "SequenceMultiInstance",
            },
          ],
        },
        {
          text: "Compensation",
          id: "taskCompensation",
          iconCss: "e-compensation e-bpmn-icons e-Compensation",
        },
        {
          text: "Activity-Type",
          id: "Activity-Type",
          items: [
            { iconCss: "e-bpmn-icons e-Task", text: "Task", id: "Task" },
            {
              text: "Collapsed sub-process",
              iconCss: "e-bpmn-icons e-SubProcess",
              id: "SubProcess",
            },
          ],
        },
        {
          text: "Boundary",
          id: "Boundary",
          items: [
            {
              text: "Default",
              iconCss: "e-boundry e-bpmn-icons e-Default",
              id: "Default",
            },
            {
              text: "Call",
              iconCss: "e-boundry e-bpmn-icons e-Call",
              id: "BoundryCall",
            },
            {
              text: "Event",
              iconCss: "e-boundry e-bpmn-icons e-Event",
              id: "BoundryEvent",
            },
          ],
        },
        {
          text: "Data Object",
          id: "DataObject",
          items: [
            {
              text: "None",
              iconCss: "e-data e-bpmn-icons e-None",
              id: "DataObjectNone",
            },
            {
              text: "Input",
              iconCss: "e-data e-bpmn-icons e-DataInput",
              id: "Input",
            },
            {
              text: "Output",
              iconCss: "e-data e-bpmn-icons e-DataOutput",
              id: "Output",
            },
          ],
        },
        {
          text: "Collection",
          id: "collection",
          iconCss: "e-collection e-bpmn-icons e-ParallelMI",
        },
        {
          text: "Task Call",
          id: "DeftCall",
          iconCss: "e-call e-bpmn-icons e-CallActivity",
        },
        {
          text: "Trigger Result",
          id: "TriggerResult",
          items: [
            {
              text: "None",
              id: "TriggerNone",
              iconCss: "e-trigger e-bpmn-icons e-None",
            },
            {
              text: "Message",
              id: "Message",
              iconCss: "e-trigger e-bpmn-icons e-InMessage",
            },
            {
              text: "Multiple",
              id: "Multiple",
              iconCss: "e-trigger e-bpmn-icons e-InMultiple",
            },
            {
              text: "Parallel",
              id: "Parallel",
              iconCss: "e-trigger e-bpmn-icons e-InParallelMultiple",
            },
            {
              text: "Signal",
              id: "Signal",
              iconCss: "e-trigger e-bpmn-icons e-InSignal",
            },
            {
              text: "Timer",
              id: "Timer",
              iconCss: "e-trigger e-bpmn-icons e-InTimer",
            },
            {
              text: "Cancel",
              id: "Cancel",
              iconCss: "e-trigger e-bpmn-icons e-CancelEnd",
            },
            {
              text: "Escalation",
              id: "Escalation",
              iconCss: "e-trigger e-bpmn-icons e-InEscalation",
            },
            {
              text: "Error",
              id: "Error",
              iconCss: "e-trigger e-bpmn-icons e-InError",
            },
            {
              text: "Compensation",
              id: "triggerCompensation",
              iconCss: "e-trigger e-bpmn-icons e-InCompensation",
            },
            {
              text: "Terminate",
              id: "Terminate",
              iconCss: "e-trigger e-bpmn-icons e-TerminateEnd",
            },
            {
              text: "Conditional",
              id: "Conditional",
              iconCss: "e-trigger e-bpmn-icons e-InConditional",
            },
            {
              text: "Link",
              id: "Link",
              iconCss: "e-trigger e-bpmn-icons e-ThrowLinkin",
            },
          ],
        },
        {
          text: "Event Type",
          id: "EventType",
          items: [
            {
              text: "Start",
              id: "Start",
              iconCss: "e-event e-bpmn-icons e-NoneStart",
            },
            {
              text: "Intermediate",
              id: "Intermediate",
              iconCss: "e-event e-bpmn-icons e-InterruptingNone",
            },
            {
              text: "Non-Interrupting Start",
              id: "NonInterruptingStart",
              iconCss: "e-event e-bpmn-icons e-Noninterruptingstart",
            },
            {
              text: "Throwing Intermediate",
              id: "ThrowingIntermediate",
              iconCss: "e-event e-bpmn-icons e-InterruptingNone",
            },
            {
              text: "Non-Interrupting Intermediate",
              id: "NonInterruptingIntermediate",
              iconCss: "e-event e-bpmn-icons e-NoninterruptingIntermediate",
            },
            {
              text: "End",
              id: "End",
              iconCss: "e-event e-bpmn-icons e-NoneEnd",
            },
          ],
        },
        {
          text: "Task Type",
          id: "TaskType",
          items: [
            {
              text: "None",
              id: "TaskNone",
              iconCss: "e-task e-bpmn-icons e-None",
            },
            {
              text: "Service",
              id: "Service",
              iconCss: "e-task e-bpmn-icons e-ServiceTask",
            },
            {
              text: "Business Rule",
              id: "BusinessRule",
              iconCss: "e-task e-bpmn-icons e-BusinessRule",
            },
            {
              text: "Instantiating Receive",
              id: "InstantiatingReceive",
              iconCss: "e-task e-bpmn-icons e-InstantiatingReceive",
            },
            {
              text: "Manual",
              id: "Manual",
              iconCss: "e-task e-bpmn-icons e-ManualCall",
            },
            {
              text: "Receive",
              id: "Receive",
              iconCss: "e-task e-bpmn-icons e-InMessage",
            },
            {
              text: "Script",
              id: "Script",
              iconCss: "e-task e-bpmn-icons e-ScriptCall",
            },
            {
              text: "Send",
              id: "Send",
              iconCss: "e-task e-bpmn-icons e-InMessage",
            },
            {
              text: "User",
              id: "User",
              iconCss: "e-task e-bpmn-icons e-UserCall",
            },
          ],
        },
        {
          text: "GateWay",
          id: "GateWay",
          iconCss: "e-bpmn-icons e-Gateway",
          items: [
            {
              text: "None",
              id: "GatewayNone",
              iconCss: "e-gate e-bpmn-icons e-None sf-icon-check-tick",
            },
            {
              text: "Exclusive",
              iconCss: "e-gate e-bpmn-icons e-ExclusiveGatewayWithMarker",
              id: "Exclusive",
            },
            {
              text: "Inclusive",
              iconCss: "e-gate e-bpmn-icons e-InclusiveGateway",
              id: "Inclusive",
            },
            {
              text: "Parallel",
              iconCss: "e-gate e-bpmn-icons e-ParallelGateway",
              id: "GatewayParallel",
            },
            {
              text: "Complex",
              iconCss: "e-gate e-bpmn-icons e-ComplexGateway",
              id: "Complex",
            },
            {
              text: "Event Based",
              iconCss: "e-gate e-bpmn-icons e-EventBasedGateway",
              id: "EventBased",
            },
            {
              text: "Exclusive Event Based",
              iconCss: "e-gate e-bpmn-icons e-ExclusiveEventBased",
              id: "ExclusiveEventBased",
            },
            {
              text: "Parallel Event Based",
              iconCss: "e-gate e-bpmn-icons e-ParallelEventBasedGatewaytostart",
              id: "ParallelEventBased",
            },
          ],
        },
        {
          text: "Message Type",
          id: "MessageType",
          items: [
            { text: "Default", id: "None", iconCss: "e-bpmn-icons" },
            {
              text: "Initiating Message",
              id: "InitiatingMessage",
              iconCss: "e-bpmn-icons",
            },
            {
              text: "Non-Initiating Message",
              id: "NonInitiatingMessage",
              iconCss: "e-bpmn-icons",
            },
          ],
        },
        {
          text: "Add Text Annotation",
          id: "TextAnnotation",
          iconCss: "e-bpmn-icons e-TextAnnotation",
        },
      ],
      showCustomMenuOnly: true,
    });
    const nodes = reactive([
      {
        id: "Start1",
        offsetX: 100,
        offsetY: 300,
        width: 50,
        height: 50,
        shape: {
          type: "Bpmn",
          shape: "Event",
          event: { event: "Start" },
        },
      },
      {
        id: "Task1",
        width: 120,
        height: 75,
        offsetX: 250,
        offsetY: 300,
        shape: {
          type: "Bpmn",
          shape: "Activity",
          activity: {
            activity: "Task",
            task: { type: "Receive" },
          },
        },
        annotations: [{ content: "Receive Book lending Request" }],
      },
      {
        id: "Task2",
        width: 120,
        height: 75,
        offsetX: 420,
        offsetY: 300,
        shape: {
          type: "Bpmn",
          shape: "Activity",
          activity: {
            activity: "Task",
            task: { type: "Service" },
          },
        },
        annotations: [
          { content: "Get the Book Status", offset: { x: 0.5, y: 0.6 } },
        ],
      },
      {
        id: "Gateway1",
        width: 70,
        height: 60,
        offsetX: 570,
        offsetY: 300,
        shape: { type: "Bpmn", shape: "Gateway" },
      },
      {
        id: "Task3",
        width: 120,
        height: 75,
        offsetX: 780,
        offsetY: 300,
        shape: {
          type: "Bpmn",
          shape: "Activity",
          activity: {
            activity: "Task",
            task: { type: "Send" },
          },
        },
        annotations: [{ content: "On loan Reply" }],
      },
      {
        id: "Gateway2",
        width: 70,
        height: 60,
        offsetX: 920,
        offsetY: 300,
        shape: {
          type: "Bpmn",
          shape: "Gateway",
          gateway: { type: "EventBased" },
        },
      },
      {
        id: "Intermediate1",
        offsetX: 1050,
        offsetY: 300,
        width: 50,
        height: 50,
        shape: {
          type: "Bpmn",
          shape: "Event",
          event: { event: "Intermediate", trigger: "Message" },
        },
        annotations: [
          {
            content: "Decline Hold",
            offset: { x: 0.5, y: 1.0 },
            verticalAlignment: "Top",
          },
        ],
      },
      {
        id: "Task4",
        width: 120,
        height: 75,
        offsetX: 1200,
        offsetY: 300,
        shape: {
          type: "Bpmn",
          shape: "Activity",
          activity: {
            activity: "Task",
            task: { type: "Receive" },
          },
        },
        annotations: [{ content: "Cancel Request" }],
      },
      {
        id: "End1",
        offsetX: 1400,
        offsetY: 300,
        width: 50,
        height: 50,
        shape: {
          type: "Bpmn",
          shape: "Event",
          event: { event: "End" },
        },
      },
      {
        id: "Intermediate2",
        offsetX: 1050,
        offsetY: 200,
        width: 50,
        height: 50,
        shape: {
          type: "Bpmn",
          shape: "Event",
          event: { event: "Intermediate", trigger: "Message" },
        },
        annotations: [
          {
            content: "Hold Book",
            offset: { x: 0.5, y: 1.0 },
            verticalAlignment: "Top",
          },
        ],
      },
      {
        id: "Intermediate3",
        offsetX: 1050,
        offsetY: 400,
        width: 50,
        height: 50,
        shape: {
          type: "Bpmn",
          shape: "Event",
          event: { event: "Intermediate", trigger: "Message" },
        },
        annotations: [
          {
            content: "One Week",
            offset: { x: 0.5, y: 1.0 },
            verticalAlignment: "Top",
          },
        ],
      },
      {
        id: "Intermediate4",
        offsetX: 900,
        offsetY: 60,
        width: 50,
        height: 50,
        shape: {
          type: "Bpmn",
          shape: "Event",
          event: { event: "Intermediate", trigger: "Message" },
        },
        annotations: [
          {
            content: "Two Weeks",
            offset: { x: 0.5, y: 1.0 },
            verticalAlignment: "Top",
          },
        ],
      },
      {
        id: "Task5",
        width: 120,
        height: 75,
        offsetX: 780,
        offsetY: 550,
        shape: {
          type: "Bpmn",
          shape: "Activity",
          activity: {
            activity: "Task",
            task: { type: "User" },
          },
        },
        annotations: [{ content: "Checkout the Book" }],
      },
      {
        id: "Task6",
        width: 120,
        height: 75,
        offsetX: 1050,
        offsetY: 550,
        shape: {
          type: "Bpmn",
          shape: "Activity",
          activity: {
            activity: "Task",
            task: { type: "Receive" },
          },
        },
        annotations: [{ content: "Checkout Reply" }],
      },
      {
        id: "Task7",
        width: 120,
        height: 75,
        offsetX: 1200,
        offsetY: 200,
        shape: {
          type: "Bpmn",
          shape: "Activity",
          activity: {
            activity: "Task",
            task: { type: "Service" },
          },
        },
        annotations: [{ content: "Request Hold" }],
      },
      {
        id: "Task8",
        width: 120,
        height: 75,
        offsetX: 1400,
        offsetY: 200,
        shape: {
          type: "Bpmn",
          shape: "Activity",
          activity: {
            activity: "Task",
            task: { type: "Receive" },
          },
        },
        annotations: [{ content: "Hold Reply" }],
      },
    ]);

    const connectors = reactive([
      {
        id: "connector1",
        sourceID: "Start1",
        targetID: "Task1",
        type: "Orthogonal",
        shape: { type: "Bpmn", sequence: "Normal" },
      },
      {
        id: "connector2",
        sourceID: "Task1",
        targetID: "Task2",
        type: "Orthogonal",
        shape: { type: "Bpmn", sequence: "Normal" },
      },
      {
        id: "connector3",
        sourceID: "Task2",
        targetID: "Gateway1",
        type: "Orthogonal",
        shape: { type: "Bpmn", sequence: "Normal" },
      },
      {
        id: "connector4",
        sourceID: "Gateway1",
        targetID: "Task3",
        annotations: [{ content: "Book is on Loan" }],
        type: "Orthogonal",
        shape: { type: "Bpmn", sequence: "Normal" },
      },
      {
        id: "connector5",
        sourceID: "Task3",
        targetID: "Gateway2",
        type: "Orthogonal",
        shape: { type: "Bpmn", sequence: "Normal" },
      },
      {
        id: "connector6",
        sourceID: "Gateway2",
        targetID: "Intermediate1",
        sourcePortID: "right",
        targetPortID: "left",
        type: "Orthogonal",
        shape: { type: "Bpmn", sequence: "Normal" },
      },
      {
        id: "connector7",
        sourceID: "Intermediate1",
        targetID: "Task4",
        type: "Orthogonal",
        shape: { type: "Bpmn", sequence: "Normal" },
      },
      {
        id: "connector8",
        sourceID: "Task4",
        targetID: "End1",
        type: "Orthogonal",
        shape: { type: "Bpmn", sequence: "Normal" },
      },
      {
        id: "connector9",
        sourceID: "Gateway2",
        targetID: "Intermediate2",
        sourcePortID: "top",
        targetPortID: "left",
        type: "Orthogonal",
        shape: { type: "Bpmn", sequence: "Normal" },
      },
      {
        id: "connector10",
        sourceID: "Gateway2",
        targetID: "Intermediate3",
        sourcePortID: "bottom",
        targetPortID: "left",
        type: "Orthogonal",
        shape: { type: "Bpmn", sequence: "Normal" },
      },
      {
        id: "connector11",
        sourceID: "Intermediate2",
        targetID: "Task7",
        type: "Orthogonal",
        shape: { type: "Bpmn", sequence: "Normal" },
      },
      {
        id: "connector12",
        sourceID: "Intermediate3",
        targetID: "Task4",
        sourcePortID: "right",
        targetPortID: "bottom",
        type: "Orthogonal",
        shape: { type: "Bpmn", sequence: "Normal" },
      },
      {
        id: "connector13",
        sourceID: "Task7",
        targetID: "Task8",
        type: "Orthogonal",
        shape: { type: "Bpmn", sequence: "Normal" },
      },
      {
        id: "connector14",
        sourceID: "Task8",
        targetID: "Intermediate4",
        sourcePortID: "top",
        targetPortID: "right",
        type: "Orthogonal",
        shape: { type: "Bpmn", sequence: "Normal" },
      },
      {
        id: "connector15",
        sourceID: "Intermediate4",
        targetID: "Task2",
        sourcePortID: "left",
        targetPortID: "top",
        type: "Orthogonal",
        shape: { type: "Bpmn", sequence: "Normal" },
      },
      {
        id: "connector16",
        sourceID: "Gateway1",
        targetID: "Task5",
        sourcePortID: "bottom",
        targetPortID: "left",
        annotations: [{ content: "Book is Avaliable" }],
        type: "Orthogonal",
        shape: { type: "Bpmn", sequence: "Normal" },
      },
      {
        id: "connector17",
        sourceID: "Task5",
        targetID: "Task6",
        type: "Orthogonal",
        shape: { type: "Bpmn", sequence: "Normal" },
      },
      {
        id: "connector18",
        sourceID: "Task6",
        targetID: "End1",
        sourcePortID: "right",
        targetPortID: "bottom",
        type: "Orthogonal",
        shape: { type: "Bpmn", sequence: "Normal" },
      },
    ]);

    return {
      width,
      height,
      palettes,
      dropDownDataSources,
      selectedItem,
      dialogAnimationSettings,
      pageSettings,
      nodes,
      connectors,
      rulerSettings,
      scrollSettings,
      drawingObject,
      contextMenu,
      snapSettings,
      diagramEvents,
      diagramPropertyBinding,
      defaultupload,
      dropdownListFields,
      dialogVisibility,
      extensionType,
      ddlTextPosition,
      fileUploadDialog,
      path,
      isModalDialog,
      dialogPosition,
      dlgTarget,
    };
  },

  mounted: function () {
    window.addEventListener("load", this.onWindowLoad);
    diagram = this.$refs.diagramInstanceRef.ej2Instances;
  },
  computed: {
    exportingButtons() {
      return this.getDialogButtons("export");
    },
    printingButtons() {
      return this.getDialogButtons("print");
    },
    hyperlinkButtons() {
      return this.getDialogButtons("hyperlink");
    },
  },

  methods: {
    // Initializes instances and binds events upon window load.
    onWindowLoad() {
      this.defaultupload = this.$refs.defaultfileuploadRef.ej2Instances;
      this.exportDialog = this.$refs.exportDialogRef.ej2Instances;
      this.hyperlinkDialog = this.$refs.hyperlinkDialogRef.ej2Instances;
      this.ddlTextPosition = this.$refs.ddlTextPositionRef.ej2Instances;
      this.diagramEvents.ddlTextPosition = this.ddlTextPosition;
      document.addEventListener("mouseover", this.menumouseover);
    },

    // Handles click events on diagram elements for specific button actions.
    click(args) {
      let diagram = document.getElementById("diagram").ej2_instances[0];
      let clickedbutton = args.button;
      if (clickedbutton == "Left") {
        diagram.nodes.forEach((element) => {
          if (element == args.element) {
            this.OnInputChanged(element, diagram);
          }
        });
      }
    },
    exportFormatChange(args){
      if (args) {
        this.selectedItem.exportSettings.format = args.value;
      }
    },
    exportRegionChange(args){
      if (args) {
        this.selectedItem.exportSettings.region = args.value;
      }
    },
    exportFileNameChange(args){
      if (args) {
        this.selectedItem.exportSettings.fileName = args.target.value;
      }
    },

    // Fit the diagram content to page when the component is created.
    created() {
      let diagram = document.getElementById("diagram").ej2_instances[0];
      diagram.fitToPage({ mode: "Page", region: "Content" });
    },

    // Manages hover interactions on menu elements to handle dropdown toggling.
    menumouseover(args) {
      let target = args.target;
      if (
        target &&
        (target.className ===
          "e-control e-dropdown-btn e-lib e-btn db-dropdown-menu" ||
          target.className ===
            "e-control e-dropdown-btn e-lib e-btn db-dropdown-menu e-ddb-active")
      ) {
        if (this.buttonInstance && this.buttonInstance.id !== target.id) {
          if (
            this.buttonInstance
              .getPopUpElement()
              .classList.contains("e-popup-open")
          ) {
            this.buttonInstance.toggle();
            let buttonElement = document.getElementById(
              this.buttonInstance.element.id
            );
            buttonElement.classList.remove("e-btn-hover");
          }
        }
        let button1 = target.ej2_instances[0];
        this.buttonInstance = button1;
        if (button1.getPopUpElement().classList.contains("e-popup-close")) {
          button1.toggle();
          if (button1.element.id === "btnArrangeMenu") {
            this.selectedItem.utilityMethods.enableArrangeMenuItems(
              this.selectedItem
            );
          }
          let buttonElement = document.getElementById(
            this.buttonInstance.element.id
          );
          buttonElement.classList.add("e-btn-hover");
        }
      } else {
        if (
          closest(target, ".e-dropdown-popup") === null &&
          closest(target, ".e-dropdown-btn") === null
        ) {
          if (
            this.buttonInstance &&
            this.buttonInstance
              .getPopUpElement()
              .classList.contains("e-popup-open")
          ) {
            this.buttonInstance.toggle();
            let buttonElement = document.getElementById(
              this.buttonInstance.element.id
            );
            buttonElement.classList.remove("e-btn-hover");
          }
        }
      }
    },

    // Retrieves dialog button configurations based on the specified dialog type.
    getDialogButtons(dialogType) {
      let buttons = [];
      switch (dialogType) {
        case "export":
          buttons.push({
            click: this.btnExportClick.bind(this),
            buttonModel: {
              content: "Export",
              cssClass: "e-flat e-db-primary",
              isPrimary: true,
            },
          });
          break;
        case "print":
          buttons.push({
            click: this.btnPrintClick.bind(this),
            buttonModel: {
              content: "Print",
              cssClass: "e-flat e-db-primary",
              isPrimary: true,
            },
          });
          break;
        case "hyperlink":
          buttons.push({
            click: this.btnHyperLink.bind(this),
            buttonModel: {
              content: "Apply",
              cssClass: "e-flat e-db-primary",
              isPrimary: true,
            },
          });
          break;
      }
      buttons.push({
        click: this.btnCancelClick.bind(this),
        buttonModel: {
          content: "Cancel",
          cssClass: "e-flat",
          isPrimary: true,
        },
      });
      return buttons;
    },

    // Executes the export operation and closes the export dialog.
    btnExportClick() {
      let diagram = document.getElementById("diagram").ej2_instances[0];
      diagram.exportDiagram({
        fileName: this.selectedItem.exportSettings.fileName,
        format: this.selectedItem.exportSettings.format,
        region: this.selectedItem.exportSettings.region,
        multiplePage: diagram.pageSettings.multiplePage,
      });
      this.exportDialog.hide();
    },

    // Executes the print operation .
     btnPrintClick() {
      let pageWidth = this.selectedItem.printSettings.pageWidth;
      let pageHeight = this.selectedItem.printSettings.pageHeight;
      diagram.print({
        region: 'Content',
        pageHeight: pageHeight,
        pageWidth: pageWidth,
        pageOrientation: this.selectedItem.printSettings.isPortrait,
      });
    },

    // Closes the appropriate dialog based on the cancel button click.
    btnCancelClick(args) {
      let ss = args.target;
      let key = ss.offsetParent.id;
      switch (key) {
        case "exportDialog":
          this.exportDialog.hide();
          break;
        case "hyperlinkDialog":
          this.hyperlinkDialog.hide();
          break;
      }
    },

    // Applies hyperlink settings to a node and updates the diagram.
    btnHyperLink() {
      let node = diagram.selectedItems.nodes[0];
      if (node.annotations.length > 0) {
        node.annotations[0].hyperlink.link =
          document.getElementById("hyperlink").value;
        node.annotations[0].hyperlink.content =
          document.getElementById("hyperlinkText").value;
        this.applyToolTipforHyperlink(node);
        diagram.dataBind();
      } else {
        let annotation = {
          hyperlink: {
            content: document.getElementById("hyperlinkText").value,
            link: document.getElementById("hyperlink").value,
          },
        };
        diagram.addLabels(node, [annotation]);
        this.applyToolTipforHyperlink(node);
        diagram.dataBind();
      }
      this.hyperlinkDialog.hide();
    },

    // Configures tooltip content for nodes with hyperlinks.
    applyToolTipforHyperlink(node) {
      node.constraints =
        (NodeConstraints.Default & ~NodeConstraints.InheritTooltip) |
        NodeConstraints.Tooltip;
      node.tooltip = {
        content: node.annotations[0].hyperlink.link,
        relativeMode: "Object",
        position: "TopCenter",
        showTipPointer: true,
      };
    },

    // Manages successful file uploads and initiates the file reading process.
    onUploadSuccess(args) {
      if (args.operation !== "remove") {
        let file1 = args.file;
        let file = file1.rawFile;
        let fileType = file1.type.toString();
        let reader = new FileReader();

        if (
          fileType.toLowerCase() === "jpg" ||
          fileType.toLowerCase() === "png"
        ) {
          reader.readAsDataURL(file);
          reader.onloadend = this.setImage.bind(this);
        } else {
          reader.readAsText(file);
          if (fileType === "json") {
            reader.onloadend = this.loadDiagram.bind(this);
          }
        }
      }
    },

    // Toggles the aspect ratio lock state for selected elements.
    aspectClick() {
      let diagram = document.getElementById("diagram").ej2_instances[0];
      let isAspect = true;
      let aspectRatioBtn =
        document.getElementById("aspectRatioBtn").ej2_instances[0];
      let node = diagram.selectedItems.nodes[0];
      if (node.constraints & NodeConstraints.AspectRatio) {
        aspectRatioBtn.iconCss = "sf-icon-unlock";
        isAspect = false;
        
      } else {
        aspectRatioBtn.iconCss = "sf-icon-lock";
        isAspect = true;
        
      }
      this.selectedItem.nodePropertyChange({
        propertyName: "aspectRatio",
        propertyValue: isAspect,
      });
    },

    // Loads diagram data from a file input.
    loadDiagram(event) {
      diagram.loadDiagram(event.target.result.toString());
    },
    // Function to define default properties for a nodes in the diagram.
    getNodeDefaults(obj) {
      obj.userHandles = [];
      obj.ports = this.getNodePorts();
      return obj;
    },

    // Function to define default properties for a connector in the diagram.
    getConnectorDefaults(connector) {
      // connector.type = 'Orthogonal';
      connector.hitPadding = 10;
      connector.bezierSettings = {
        controlPointsVisibility:
          ControlPointsVisibility.Source | ControlPointsVisibility.Target,
        smoothness: BezierSmoothness.SymmetricDistance,
      };
      if (connector.annotations.length > 0) {
        connector.annotations[0].style.fill = "White";
      }
      return connector;
    },

    //function to define ports for node
    getNodePorts() {
      var ports = [
        { id: "left", shape: "Circle", offset: { x: 0, y: 0.5 } },
        { id: "bottom", shape: "Circle", offset: { x: 0.5, y: 1 } },
        { id: "right", shape: "Circle", offset: { x: 1, y: 0.5 } },
        { id: "top", shape: "Circle", offset: { x: 0.5, y: 0 } },
      ];
      return ports;
    },
    toolbarCreated(){
      if (this.isConToolActive) {
       let conDropDown = document.getElementById('conTypeBtn');
       conDropDown.classList.add('tb-item-selected');
      }
    },
    // Function to handle click events on the toolbar editor.
    toolbarEditorClick(args) {
      var item = args.item.tooltipText;
      switch (item) {
        case "Undo":
          diagram.undo();
          break;
        case "Redo":
          diagram.redo();
          break;
        case "Select Tool":
          diagram.clearSelection();
          this.isConToolActive =false;
          diagram.tool = DiagramTools.Default;
          break;
        case "Pan Tool":
          diagram.clearSelection();
          this.isConToolActive =false;
          diagram.tool = DiagramTools.ZoomPan;
          break;
        case "Text Tool":
          diagram.clearSelection();
          this.isConToolActive =false;
          diagram.selectedItems.userHandles = [];
          diagram.drawingObject = { shape: { type: "Text" } };
          diagram.tool = DiagramTools.ContinuousDraw;
          break;
        case "Group":
          diagram.group();
          args.item.prefixIcon = "sf-icon-ungroup";
          args.item.tooltipText = "UnGroup";
          break;
        case "UnGroup":
          diagram.unGroup();
          args.item.prefixIcon = "sf-icon-group";
          args.item.tooltipText = "Group";
          break;
        case "Align Left":
          diagram.align("Left");
          break;
        case "Align Right":
          diagram.align("Right");
          break;
        case "Align Center":
          diagram.align("Center");
          break;
        case "Align Middle":
          diagram.align("Middle");
          break;
        case "Align Top":
          diagram.align("Top");
          break;
        case "Align Bottom":
          diagram.align("Bottom");
          break;
        case "Distribute Objects Vertically":
          diagram.distribute("BottomToTop");
          break;
        case "Distribute Objects Horizontally":
          diagram.distribute("RightToLeft");
          break;
        case "Send To Back":
          diagram.sendToBack();
          break;
        case "Bring To Front":
          diagram.bringToFront();
          break;
        case "Send Backward":
          diagram.sendBackward();
          break;
        case "Bring Forward":
          diagram.moveForward();
          break;
        case "Lock":
          this.lockObject(diagram);
          break;
        case "Delete":
          diagram.remove();
          break;
      }
      if (
        item === "Select Tool" ||
        item === "Pan Tool" ||
        item === "Text Tool"
      ) {
        if (args.item.cssClass.indexOf("tb-item-selected") === -1) {
          this.removeSelectedToolbarItem();
          args.item.cssClass += " tb-item-selected";
        }
        // document
        //   .getElementById("btnDrawConnector")
          // .classList.remove("tb-item-selected");/
      }
      diagram.dataBind();
    },

    //To enable or diable interactions for selected node or connector
    lockObject(diagram) {
      for (let i = 0; i < diagram.selectedItems.nodes.length; i++) {
        let node = diagram.selectedItems.nodes[i];
        if (node.constraints & NodeConstraints.Drag) {
          node.constraints =
            NodeConstraints.PointerEvents | NodeConstraints.Select;
        } else {
          node.constraints = NodeConstraints.Default;
        }
      }
      for (let i = 0; i < diagram.selectedItems.connectors.length; i++) {
        let connector = diagram.selectedItems.connectors[i];
        if (connector.constraints & ConnectorConstraints.Drag) {
          connector.constraints =
            ConnectorConstraints.PointerEvents | ConnectorConstraints.Select;
        } else {
          connector.constraints = ConnectorConstraints.Default;
        }
      }
      diagram.dataBind();
    },

    // Enables diagram renaming through UI interaction.
    renameDiagram() {
      document
        .querySelector(".db-diagram-name-container")
        .classList.add("db-edit-name");
      const editableElement = document.getElementById("diagramEditable");
      const diagramNameElement = document.getElementById("diagramName");
      if (diagramNameElement) {
        editableElement.value =
          diagramNameElement.innerText || diagramNameElement.textContent;
      }
      editableElement.focus();
      editableElement.select();
    },
    diagramNameKeyDown(args) {
      if (args.which === 13) {
        document.getElementById('diagramName').innerHTML = document.getElementById('diagramEditable').value;
        document.getElementsByClassName('db-diagram-name-container')[0].classList.remove('db-edit-name');
      }
    },
    diagramNameChange() {
      document.getElementById('diagramName').innerHTML = document.getElementById('diagramEditable').value;
      document.getElementsByClassName('db-diagram-name-container')[0].classList.remove('db-edit-name');
    },

    // Facilitates downloading of diagram data in JSON format.
    download(data) {
      if (window.navigator.msSaveBlob) {
        var blob = new Blob([data], { type: "data:text/json;charset=utf-8," });
        window.navigator.msSaveOrOpenBlob(blob, "Diagram.json");
      } else {
        var dataStr =
          "data:text/json;charset=utf-8," + encodeURIComponent(data);
        var a = document.createElement("a");
        a.href = dataStr;
        a.download = document.getElementById('diagramName').innerHTML + '.json';
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
    },

    // Executes commands for inserting elements via the toolbar when clicked.
    toolbarInsertClick(args) {
      let commandType = (args.item ? args.item.text : args.target.id)
        .replace(/[' ']/g, "")
        .toLowerCase();

      if (diagram.selectedItems.nodes.length > 0) {
        switch (commandType.toLowerCase()) {
          case "insertlink":
            document.getElementById("hyperlink").value = "";
            document.getElementById("hyperlinkText").value = "";
            if (diagram.selectedItems.nodes[0].annotations.length > 0) {
              let annotation = diagram.selectedItems.nodes[0].annotations[0];
              if (annotation.hyperlink.link || annotation.content) {
                document.getElementById("hyperlink").value =
                  annotation.hyperlink.link;
                document.getElementById("hyperlinkText").value =
                  annotation.hyperlink.content || annotation.content;
              }
            }
            this.hyperlinkDialog.show();
            break;
        }
      }
    },

    // Opens the file upload dialog with specified file type constraints.
    openUploadBox(extensionType) {
      let defaultUpload =
        document.getElementById("defaultfileupload").ej2_instances[0];
      defaultUpload.clearAll();
      // eslint-disable-next-line
      extensionType =defaultUpload.allowedExtensions = extensionType;
      defaultUpload.dataBind();
      document.getElementsByClassName("e-file-select-wrap")[0].children[0].click();
    },

    // Adjusts diagram page settings in response to paper size changes.
    paperListChange(args) {
      var value = args.value || args.item.value;
      var paperSize = this.selectedItem.utilityMethods.getPaperSize(value);
      var pageWidth = paperSize.pageWidth;
      var pageHeight = paperSize.pageHeight;
      if (pageWidth && pageHeight) {
        if (diagram.pageSettings.orientation === "Portrait") {
          if (pageWidth > pageHeight) {
            let temp = pageWidth;
            pageWidth = pageHeight;
            pageHeight = temp;
          }
        } else {
          if (pageHeight > pageWidth) {
            let temp = pageHeight;
            pageHeight = pageWidth;
            pageWidth = temp;
          }
        }
        diagram.pageSettings.width = pageWidth;
        diagram.pageSettings.height = pageHeight;
      } else {
        diagram.pageSettings.width = 1460;
        diagram.pageSettings.height = 600;
      }
      let arrangeContextMenu =
        document.getElementById("arrangeContextMenu").ej2_instances[0];
      this.updatePaperSelection(arrangeContextMenu.items[1], args.value);
      diagram.dataBind();
    },

    // Updates the visual selection indicator for paper size menu items.
    updatePaperSelection(items, value) {
      for (let i = 0; i < items.items.length; i++) {
        if (value === items.items[i].value) {
          items.items[i].iconCss = "sf-icon-check-tick";
        } else {
          items.items[i].iconCss = "";
        }
      }
    },

    // Updates menu item selections to reflect current application state.
    updateSelection(item) {
      for (let i = 0; i < item.parentObj.items.length; i++) {
        if (item.text === item.parentObj.items[i].text) {
          item.parentObj.items[i].iconCss = "sf-icon-check-tick";
        } else {
          item.parentObj.items[i].iconCss = "";
        }
      }
    },

    // Responds to context menu command execution based on user selection.
    menuClick(args) {
      let buttonElement = document.getElementsByClassName("e-btn-hover")[0];
      if (buttonElement) {
        buttonElement.classList.remove("e-btn-hover");
      }
      const command = args.item.text;

      switch (command) {
        case "New":
          diagram.clear();
          this.diagramEvents.historyChange();
          break;
        case "Save":
          this.download(diagram.saveDiagram());
          break;
        case "Export":
        this.selectedItem.exportSettings.fileName = document.getElementById('diagramName').innerHTML;
          this.exportDialog.show();
          break;
        case "Open":
          this.openUploadBox(".json");
          break;
        case "Print":
          this.btnPrintClick();
          break;
        case "Undo":
          diagram.undo();
          break;
        case "Redo":
          diagram.redo();
          break;
        case "Cut":
          diagram.cut();
          break;
        case "Copy":
          diagram.copy();
          break;
        case "Paste":
          diagram.paste();
          break;
        case "Delete":
          diagram.remove();
          break;

        case "Select All":
          diagram.clearSelection();
          diagram.selectAll();
          break;
        case "Select All Nodes":
          diagram.clearSelection();
          diagram.select(diagram.nodes);
          break;
        case "Select All Connectors":
          diagram.clearSelection();
          diagram.select(diagram.connectors);
          break;
        case "Deselect All":
          diagram.clearSelection();
          break;
        case "Selection Tool":
          diagram.tool = DiagramTools.Default;
          this.isConToolActive = false;
          this.removeSelectedToolbarItem();
          break;
        case "Pan Tool":
          diagram.clearSelection();
          this.isConToolActive = false;
          diagram.tool = DiagramTools.ZoomPan;
          this.removeSelectedToolbarItem();
          break;
        case "Show Lines":
          diagram.snapSettings.constraints =
            diagram.snapSettings.constraints ^ SnapConstraints.ShowLines;
          args.item.iconCss = args.item.iconCss ? "" : "sf-icon-check-tick";
          break;
        case "Snap To Grid":
          diagram.snapSettings.constraints =
            diagram.snapSettings.constraints ^ SnapConstraints.SnapToLines;
          args.item.iconCss = args.item.iconCss ? "" : "sf-icon-check-tick";
          break;
        case "Snap To Object":
          diagram.snapSettings.constraints =
            diagram.snapSettings.constraints ^ SnapConstraints.SnapToObject;
          args.item.iconCss = args.item.iconCss ? "" : "sf-icon-check-tick";
          break;
        case "Show Ruler":
          args.item.iconCss = args.item.iconCss ? "" : "sf-icon-check-tick";
          diagram.rulerSettings.showRulers = !diagram.rulerSettings.showRulers;
          break;
        case "Show Page Breaks":
          args.item.iconCss = args.item.iconCss ? "" : "sf-icon-check-tick";
          if (args.item.iconCss) {
            diagram.pageSettings.showPageBreaks = true;
            this.selectedItem.pageSettings.pageBreaks = true;
          } else {
            diagram.pageSettings.showPageBreaks = false;
            this.selectedItem.pageSettings.pageBreaks = false;
          }
          break;
        case "Fit To Width":
          diagram.fitToPage({ mode: "Width" });
          break;
        case "Fit To Page":
          diagram.fitToPage({ mode: "Page", region: "Content" });
          break;
        case "Landscape":
          args.item.parentObj.items[1].iconCss = "";
          args.item.iconCss = "sf-icon-check-tick";
          diagram.pageSettings.orientation = "Landscape";
          document.getElementById("pageLandscape").classList.add("e-active");
          document.getElementById("pagePortrait").classList.remove("e-active");
          break;
        case "Orthogonal":
          diagram.clearSelection();
          this.isConToolActive = true;
          this.selectedItem.utilityMethods.onConnectorSelect(args);
          break;
        case "Straight":
          diagram.clearSelection();
          this.isConToolActive = true;
          this.selectedItem.utilityMethods.onConnectorSelect(args);
          break;
        case "Bezier":
          diagram.clearSelection();
          this.isConToolActive = true;
          this.selectedItem.utilityMethods.onConnectorSelect(args);
          break;
        case "Portrait":
          args.item.parentObj.items[0].iconCss = "";
          args.item.iconCss = "sf-icon-check-tick";
          diagram.pageSettings.orientation = "Portrait";
          document.getElementById("pagePortrait").classList.add("e-active");
          document.getElementById("pageLandscape").classList.remove("e-active");
          break;
        case "Letter (8.5 in x 11 in)":
        case "Legal (8.5 in x 14 in)":
        case "A3 (297 mm x 420 mm)":
        case "A4 (210 mm x 297 mm)":
        case "A5 (148 mm x 210 mm)":
        case "A6 (105 mm x 148 mm)":
        case "Tabloid (279 mm x 432 mm)":
          this.paperListChange(args);
          this.updateSelection(args.item);
          this.selectedItem.pageSettings.paperSize = args.item.value;
          break;
      }
      diagram.dataBind();
      var toolbarObj = document.getElementById("toolbarEditor").ej2_instances[0];
      var conDropDown = document.getElementById("conTypeBtn");
      if (command === "Selection Tool") {
        if (!toolbarObj.items[4].cssClass.includes("tb-item-selected")) {
          toolbarObj.items[4].cssClass += " tb-item-selected";
        }
        conDropDown.classList.remove("tb-item-selected");
      } else if (command === "Pan Tool") {
        if (!toolbarObj.items[3].cssClass.includes("tb-item-selected")) {
          toolbarObj.items[3].cssClass += " tb-item-selected";
        }
        conDropDown.classList.remove("tb-item-selected");
      }



    },

    // Removes selection highlighting from currently selected toolbar items.
    removeSelectedToolbarItem() {
      var toolbarObj =
        document.getElementById("toolbarEditor").ej2_instances[0];
      for (var i = 0; i < toolbarObj.items.length; i++) {
        var item = toolbarObj.items[i];
        if (item.cssClass.indexOf("tb-item-selected") !== -1) {
          item.cssClass = item.cssClass.replace(" tb-item-selected", "");
        }
      }
      toolbarObj.dataBind();
    },

    // Adjusts the position of the arrange context menu for proper display.
    arrangeContextMenuOpen(args) {
      if (args.element.classList.contains("e-menu-parent")) {
        let popup = document.querySelector("#btnDesignMenu-popup");
        args.element.style.left = formatUnit(
          parseInt(args.element.style.left, 10) - parseInt(popup.style.left, 10)
        );
        args.element.style.top = formatUnit(
          parseInt(args.element.style.top, 10) - parseInt(popup.style.top, 10)
        );
      }
    },

    // Adjusts the position of the tool context menu for proper display.
    toolContextMenuOpen(args) {
      if (args.element.classList.contains("e-menu-parent")) {
        var popup = document.querySelector("#btnToolMenu-popup");
        args.element.style.left = formatUnit(
          parseInt(args.element.style.left, 10) - parseInt(popup.style.left, 10)
        );
        args.element.style.top = formatUnit(
          parseInt(args.element.style.top, 10) - parseInt(popup.style.top, 10)
        );
      }
    },

    // Adjusts the position of the edit context menu for proper display.
    editContextMenuOpen(args) {
      if (args.element.classList.contains("e-menu-parent")) {
        var popup = document.querySelector("#btnEditMenu-popup");
        args.element.style.left = formatUnit(
          parseInt(args.element.style.left, 10) - parseInt(popup.style.left, 10)
        );
        args.element.style.top = formatUnit(
          parseInt(args.element.style.top, 10) - parseInt(popup.style.top, 10)
        );
      }
    },

    // Ensures the arrange menu remains open when interaction occurs.
    arrangeMenuBeforeClose(args) {
      if (
        args.event &&
        closest(args.event.target, ".e-dropdown-btn") !== null
      ) {
        args.cancel = true;
      }
      if (!args.element) {
        args.cancel = true;
      }
    },

    // Prepares the arrange menu before it opens, applying necessary styles.
    arrangeMenuBeforeOpen(args) {
      this.updateMenuStyle(args);
      if (
        args.event &&
        closest(args.event.target, ".e-dropdown-btn") !== null
      ) {
        args.cancel = true;
      }
    },

    // Applies consistent stylings to menu items when the menu is updated.
    updateMenuStyle(args) {
      for (let i = 0; i < args.element.children.length; i++) {
        args.element.children[i].style.display = "block";
      }
    },

    // Determines the appropriate shortcut key string for a given menu item.
    getShortCutKey(menuItem) {
      let shortCutKey = navigator.platform.indexOf("Mac") > -1 ? "Cmd" : "Ctrl";
      switch (menuItem) {
        case "New":
          shortCutKey = "Shift" + "+N";
          break;
        case "Open":
          shortCutKey = shortCutKey + "+O";
          break;
        case "Save":
          shortCutKey = shortCutKey + "+S";
          break;
        case "Undo":
          shortCutKey = shortCutKey + "+Z";
          break;
        case "Redo":
          shortCutKey = shortCutKey + "+Y";
          break;
        case "Cut":
          shortCutKey = shortCutKey + "+X";
          break;
        case "Copy":
          shortCutKey = shortCutKey + "+C";
          break;
        case "Paste":
          shortCutKey = shortCutKey + "+V";
          break;
        case "Delete":
          shortCutKey = "Delete";
          break;
        case "Duplicate":
          shortCutKey = shortCutKey + "+D";
          break;
        case "Select All":
          shortCutKey = shortCutKey + "+A";
          break;
        case "Zoom In":
          shortCutKey = shortCutKey + "++";
          break;
        case "Zoom Out":
          shortCutKey = shortCutKey + "+-";
          break;
        case "Group":
          shortCutKey = shortCutKey + "+G";
          break;
        case "Ungroup":
          shortCutKey = shortCutKey + "+U";
          break;
        case "Send To Back":
          shortCutKey = shortCutKey + "+Shift+B";
          break;
        case "Bring To Front":
          shortCutKey = shortCutKey + "+Shift+F";
          break;
        default:
          shortCutKey = "";
          break;
      }
      return shortCutKey;
    },

    // Enables or disables menu items based on the current application context.
    enableMenuItems(itemText) {
      let selectedDiagram = diagram.ej2_instances
        ? diagram.ej2_instances[0]
        : diagram;
      let selectedItems = selectedDiagram.selectedItems.nodes;
      selectedItems = selectedItems.concat(
        selectedDiagram.selectedItems.connectors
      );

      if (itemText) {
        var commandType = itemText.replace(/[' ']/g, "");
        if (selectedItems.length === 0) {
          switch (commandType.toLowerCase()) {
            case "edittooltip":
              return !(selectedItems.length === 1);
            case "cut":
            case "copy":
            case "delete":
              return true;
          }
        }

        if (selectedItems.length > 1) {
          if (commandType.toLowerCase() === "edittooltip") {
            return true;
          }
        }

        if (
          !(
            diagram.commandHandler.clipboardData.pasteIndex !== undefined &&
            diagram.commandHandler.clipboardData.clipObject !== undefined
          ) &&
          itemText === "Paste"
        ) {
          return true;
        }

        if (
          itemText === "Undo" &&
          diagram.historyManager.undoStack.length === 0
        ) {
          return true;
        }
        if (
          itemText === "Redo" &&
          diagram.historyManager.redoStack.length === 0
        ) {
          return true;
        }
      }
      return false;
    },

    // Adjusts the zoom level of the diagram based on user interactions.
    zoomChange(args) {
      let zoomCurrentValue =
        document.getElementById("btnZoomIncrement").ej2_instances[0];
      let currentZoom = diagram.scrollSettings.currentZoom;
      let zoom = {};
      switch (args.item.text) {
        case "Zoom In":
          diagram.zoomTo({ type: "ZoomIn", zoomFactor: 0.2 });
          zoomCurrentValue.content =
            (diagram.scrollSettings.currentZoom * 100).toFixed() + "%";
          break;
        case "Zoom Out":
          diagram.zoomTo({ type: "ZoomOut", zoomFactor: 0.2 });
          zoomCurrentValue.content =
            (diagram.scrollSettings.currentZoom * 100).toFixed() + "%";
          break;
        case "Zoom to Fit":
          diagram.fitToPage({ mode: "Page", region: "Content" });
          zoomCurrentValue.content = diagram.scrollSettings.currentZoom + " %";
          break;
        case "Zoom to 50%":
          zoom.zoomFactor = 0.5 / currentZoom - 1;
          diagram.zoomTo(zoom);
          break;
        case "Zoom to 100%":
          zoom.zoomFactor = 1 / currentZoom - 1;
          diagram.zoomTo(zoom);
          break;
        case "Zoom to 200%":
          zoom.zoomFactor = 2 / currentZoom - 1;
          diagram.zoomTo(zoom);
          break;
      }
      zoomCurrentValue.content =
        Math.round(diagram.scrollSettings.currentZoom * 100) + "%";
    },

    // Toggles the visibility of certain elements within the application layout.
    hideElements() {
      let diagramContainer = document.getElementsByClassName(
        "diagrambuilder-container"
      )[0];
      if (diagramContainer.classList.contains("hide-properties")) {
        diagramContainer.classList.remove("hide-properties");
        document.getElementById("hideProperty").style.backgroundColor = "";
        document.getElementById(
          "hideProperty"
        ).ej2_instances[0].isPrimary = true;
      } else {
        diagramContainer.classList.add("hide-properties");
        document.getElementById("hideProperty").style.backgroundColor =
          "#e3e3e3";
        document.getElementById(
          "hideProperty"
        ).ej2_instances[0].isPrimary = false;
      }
      if (diagram) {
        diagram.updateViewPort();
      }
    },
    // Incorporates shortcut key information into menu items before rendering.
    beforeItemRender(args) {
      let shortCutText = this.getShortCutKey(args.item.text);
      if (shortCutText) {
        var shortCutSpan = document.createElement("span");
        shortCutSpan.textContent = shortCutText;
        shortCutSpan.style.pointerEvents = "none";
        args.element.appendChild(shortCutSpan);
        shortCutSpan.setAttribute("class", "db-shortcut");
      }
      let status = this.enableMenuItems(args.item.text);
      if (status) {
        args.element.classList.add("e-disabled");
      } else {
        if (args.element.classList.contains("e-disabled")) {
          args.element.classList.remove("e-disabled");
        }
      }
    },
  },

  provide: {
    diagram: [
      UndoRedo,
      Snapping,
      PrintAndExport,
      BpmnDiagrams,
      DiagramContextMenu,
      ConnectorBridging,
    ],
    SymbolPalette: [BpmnDiagrams],
  },
});
</script>
