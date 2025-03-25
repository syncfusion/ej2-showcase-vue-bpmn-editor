import { NodeModel, SymbolInfo, PaletteModel, MarginModel } from '@syncfusion/ej2-vue-diagrams';
import { ExpandMode } from '@syncfusion/ej2-vue-navigations';
import { ConnectorConstraints, NodeConstraints } from '@syncfusion/ej2-diagrams';

export class Palettes {
    public expandMode: ExpandMode = 'Multiple';
    public symbolMargin: MarginModel = { left: 15, right: 15, top: 12, bottom: 15 };

    // Initialize the BPMN shapes for the symbol palette
    public bpmnShapes: NodeModel[] | any = [
        {
            id: 'Task', width: 35, height: 30,
            shape: {
                type: 'Bpmn', shape: 'Activity', activity: {
                    activity: 'Task',
                },
            },
            tooltip: { content: 'Task'},constraints: NodeConstraints.Default | NodeConstraints.Tooltip,
        },
        {
            id: 'Gateway', width: 30, height: 30,
            shape: { type: 'Bpmn', shape: 'Gateway', },
            tooltip: { content: 'Gateway'},constraints: NodeConstraints.Default | NodeConstraints.Tooltip,

        },
        {
            id: 'Intermediate_Event', width: 30, height: 30, shape: {
                type: 'Bpmn', shape: 'Event',
                event: { event: 'Intermediate' }
            },
            tooltip: { content: 'Intermediate Event'},constraints: NodeConstraints.Default | NodeConstraints.Tooltip,

        },
        {
            id: 'End_Event', width: 30, height: 30, shape: {
                type: 'Bpmn', shape: 'Event',
                event: { event: 'End' }
            },
            tooltip: { content: 'End Event'},constraints: NodeConstraints.Default | NodeConstraints.Tooltip,

        },
        {
            id: 'Start_Event', width: 30, height: 30, shape: {
                type: 'Bpmn', shape: 'Event',
                event: { event: 'Start' }
            },
            tooltip: { content: 'Start Event'},constraints: NodeConstraints.Default | NodeConstraints.Tooltip,

        },
        {
            id: 'Collapsed_Sub-process', width: 35, height: 30, shape: {
                type: 'Bpmn', shape: 'Activity', activity: {
                    activity: 'SubProcess', subProcess: { collapsed: true, boundary: 'Default' }
                },
            },
            tooltip: { content: 'Collapsed Sub process'},constraints: NodeConstraints.Default | NodeConstraints.Tooltip,

        },
        {
            id: 'Expanded_Sub-Process', width: 35, height: 30,
            shape: {
                shape: 'Activity', type: 'Bpmn',
                activity: {
                    activity: 'SubProcess', subProcess: {
                        type: 'Transaction', collapsed: false,
                        processes: [], transaction: {
                            cancel: { visible: false }, failure: { visible: false }, success: { visible: false }
                        }
                    }
                }
            },
            tooltip: { content: 'Expanded Sub Process'},
            constraints: NodeConstraints.Default |NodeConstraints.AllowDrop| NodeConstraints.Tooltip,

        },
        {
            id: 'Sequence_Flow',
            sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 30, y: 30 },
            type: 'Straight', targetDecorator: { shape: 'Arrow', style: { fill: 'black' } },
            shape: { type: 'Bpmn', flow: 'Sequence', sequence: 'Normal' },
            tooltip: { content: 'Sequence Flow'},constraints: ConnectorConstraints.Default | ConnectorConstraints.Tooltip,

        },
        {
            id: 'Association_Flow',
            sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 30, y: 35 },
            type: 'Straight', style: { strokeDashArray: "2 2" },
            targetDecorator: { shape: 'None' }, sourceDecorator: { shape: 'None' },
            shape: { type: 'Bpmn', flow: 'Association', association: 'Default' },
            tooltip: { content: 'Association Flow'},constraints: ConnectorConstraints.Default | ConnectorConstraints.Tooltip,

        },
        {
            id: 'Message_Flow',
            sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 30, y: 22 }, type: 'Straight',
            sourceDecorator: { shape: 'None' }, targetDecorator: { shape: 'Arrow', style: { fill: 'white' } },
            style: { strokeDashArray: '4 4' },
            tooltip: { content: 'Message Flow'},constraints: ConnectorConstraints.Default | ConnectorConstraints.Tooltip,

        },
        {
            id: 'Message', width: 35,
            height: 26, shape: { type: 'Bpmn', shape: 'Message', },
            tooltip: { content: 'Message'},constraints: NodeConstraints.Default | NodeConstraints.Tooltip,

        },
        {
            id: 'Data_Source', width: 30, height: 28, shape: {
                type: 'Bpmn', shape: 'DataSource',
            },
            tooltip: { content: 'Data Source'},constraints: NodeConstraints.Default | NodeConstraints.Tooltip,

        },
        {
            id: 'Data_Object', width: 30, height: 35,
            shape: { type: 'Bpmn', shape: 'DataObject', dataObject: { collection: false, type: 'None' } },
            tooltip: { content: 'Data Object'},constraints: NodeConstraints.Default | NodeConstraints.Tooltip,

        },
    ];

    public palettes: PaletteModel[] = [
        {
            id: 'bpmn_shapes',
            expanded: true,
            symbols: this.bpmnShapes,
            title: 'BPMN Shapes'
        },
    ];

    public getSymbolInfo(symbol: NodeModel): SymbolInfo {
        return { tooltip: symbol.id.replace('_', ' ') };
    }
}