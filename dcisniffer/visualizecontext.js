var Clicks;
(function (Clicks) {
    Clicks[Clicks["Single"] = 1] = "Single";
    Clicks[Clicks["Double"] = 2] = "Double";
    Clicks[Clicks["Triple"] = 3] = "Triple";
})(Clicks || (Clicks = {}));
class Toolbar {
    constructor(container, context) {
        this.context = context;
        const interactions = container.querySelector('#interactions');
        interactions.addEventListener('click', () => this.onlyInteractions = interactions.checked);
        this._onlyInteractions = interactions.checked;
    }
    get onlyInteractions() { return this._onlyInteractions; }
    set onlyInteractions(state) {
        this._onlyInteractions = state;
        this.context.redraw();
    }
}
class VisualizeContext {
    constructor(nodes, edges, container, toolbar) {
        //this.roles = new Set(nodes.map(node => node.group))
        this._getterNodes = [];
        const nodeSet = this.nodes = new vis.DataSet(nodes.map((node, index, arr) => {
            const angle = 2 * Math.PI * (index / arr.length + 0.75);
            const radius = 225 + arr.length * 10;
            const output = Object.assign({}, node);
            output.x = radius * Math.cos(angle);
            output.y = radius * Math.sin(angle);
            return output;
        }));
        const edgeSet = this.edges = new vis.DataSet(edges.map(e => Object.assign({}, e)));
        // Set node border and size based on connected edges        
        nodeSet.update(nodeSet.get()
            .map(node => {
            const nodeEdgesFrom = edgeSet.get({ filter: e => e.from == node.id });
            const nodeEdgesTo = edgeSet.get({ filter: e => e.to == node.id });
            const uniqueEdges = (edges) => new Set(edges.map(e => e.from + e.to));
            const borderWidth = uniqueEdges(nodeEdgesTo).size * 1.5;
            if (nodeEdgesFrom.length == 0)
                this._getterNodes.push(node.id);
            return {
                id: node.id,
                shape: node.group != '__CONTEXT'
                    ? (nodeEdgesFrom.length > 0 ? 'dot' : 'diamond')
                    : null,
                borderWidth: borderWidth,
                borderWidthSelected: borderWidth,
                size: 20 + nodeEdgesFrom.length * 3
            };
        }));
        const options = {
            physics: false,
            nodes: {
                shape: 'dot',
                font: {
                    size: 16
                }
            },
            edges: {
                arrows: 'to',
                selectionWidth: width => Math.max(3, width * 1.5)
            },
            groups: {
                '__CONTEXT': {
                    shape: 'box',
                    shapeProperties: {
                        borderRadius: 1
                    },
                    color: '#bbb',
                    font: {
                        size: 18
                    }
                }
            }
        };
        this.network = new vis.Network(container, {
            nodes: nodeSet,
            edges: edgeSet
        }, options);
        this.toolbar = new Toolbar(toolbar, this);
        this.clicks = [0, 0];
    } // end constructor
    ///// System operations /////////////////////////////////////////
    start() {
        const network = this.network;
        network.on("click", () => this.redraw());
        this.redraw();
    }
    redraw() {
        this.network_displaySelection();
    }
    edges_displayAll() {
        this.edges_display(null);
    }
    edges_hideAll() {
        this.edges_display(null, false);
    }
    edges_display(edgeIds, display = true) {
        if (edgeIds == null)
            edgeIds = this.edges.get().map(e => e.id);
        let updates = edgeIds.map(id => ({
            id: id,
            hidden: !display
        }));
        if (display && this.toolbar_onlyInteractions()) {
            // Only display edges for nodes that are selected
            // or isn't a getter node.
            const selection = this.network_selectedNodes();
            updates.forEach(u => {
                const edge = this.edges.get(u.id);
                if (!selection.includes(edge.to) &&
                    this._getterNodes.includes(edge.to)) {
                    u.hidden = true;
                }
            });
        }
        this.edges.update(updates);
    }
    clicks_track() {
        const now = Date.now();
        let nrClicks = Clicks.Single;
        if (now - this.clicks[1] < 600)
            nrClicks = Clicks.Triple;
        else if (now - this.clicks[0] < 500)
            nrClicks = Clicks.Double;
        this.clicks.unshift(now);
        this.clicks.pop();
        return nrClicks;
    }
    network_selectedNodes() {
        return this.network.getSelection().nodes;
    }
    network_displaySelection() {
        const selected = this.network.getSelection();
        if (selected.nodes.length == 0 && selected.edges.length == 0) {
            this.edges_displayAll();
            return;
        }
        // Hide all edges before displaying the selected ones
        this.edges_hideAll();
        const clicks = this.clicks_track();
        const onlyExactNodes = clicks == Clicks.Single;
        if (selected.nodes.length > 0 && clicks == Clicks.Triple) {
            this.edges_display(selected.nodes.flatMap(nodeId => this.nodes_uniPathFrom(nodeId)));
        }
        else if (selected.nodes.length > 0) {
            // Displaying nodes takes precedence above edges
            this.nodes_displayEdgesFor(selected.nodes, onlyExactNodes);
        }
        else {
            this.nodes_displayEdgesFor(selected.edges.flatMap(edgeId => this.network.getConnectedNodes(edgeId)), onlyExactNodes);
        }
    }
    network_connectedEdges(nodeId) {
        return this.network.getConnectedEdges(nodeId);
    }
    nodes_get(id) {
        return this.nodes.get(id);
    }
    nodes_displayEdgesFor(nodeIdList, onlyExactNodes) {
        const nodes = this.nodes.get(nodeIdList);
        const filter = onlyExactNodes
            ? n => nodes.some(n2 => n2.id == n.id)
            : n => nodes.some(selected => selected.group == n.group);
        const edges = this.nodes
            .get({ filter: filter })
            .map(n => n.id)
            .flatMap(id => this.network_connectedEdges(id));
        this.edges_display(edges);
    }
    nodes_uniPathFrom(nodeId, visitedIds = []) {
        visitedIds.push(nodeId);
        const fromEdges = (nodeId) => this.edges
            .get(this.network_connectedEdges(nodeId))
            .filter(e => e.from == nodeId);
        const allEdges = fromEdges(nodeId);
        const addEdges = allEdges
            .filter(e => fromEdges(e.to).length > 0);
        return addEdges.map(e => e.id).concat(allEdges
            .filter(e => !visitedIds.includes(e.to))
            .flatMap(e => this.nodes_uniPathFrom(e.to, visitedIds)));
    }
    toolbar_onlyInteractions() {
        return this.toolbar.onlyInteractions;
    }
}
//# sourceMappingURL=visualizecontext.js.map