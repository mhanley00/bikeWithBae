// Esri Layers
import CSVLayer from 'esri/layers/CSVLayer';
import GraphicsLayer from 'esri/layers/GraphicsLayer';
import FeatureLayer from 'esri/layers/FeatureLayer';
import ImageryLayer from 'esri/layers/ImageryLayer';
import MapImageLayer from 'esri/layers/MapImageLayer';
import SceneLayer from 'esri/layers/SceneLayer';
import WebTileLayer from 'esri/layers/WebTileLayer';
// Esri Web Products
import WebScene from 'esri/WebScene';
import WebMap from 'esri/WebMap';

export default (layer) => {
    let esriLayer = null;

    switch (layer.type) {
        case 'CSVLayer':
            esriLayer = new CSVLayer(layer.options);
        break;
        case 'GraphicsLayer':
            esriLayer = new GraphicsLayer(layer.options);
        break;
        case 'FeatureLayer':
            esriLayer = new FeatureLayer(layer.options);
        break;
        case 'ImageryLayer':
            esriLayer = new ImageryLayer(layer.options);
        break;
        case 'MapImageLayer':
            esriLayer = new MapImageLayer(layer.options);
        break;
        case 'SceneLayer':
            esriLayer = new SceneLayer(layer.options);
        break;
        case 'WebTiledLayer':
            esriLayer = new WebTileLayer(layer.options);
        break;

        case 'WebScene':
            esriLayer = new WebScene(layer.options);
        break;
        case 'WebMap':
            esriLayer = new WebMap(layer.options);
        break;
        default:
            console.warn('No matching layer type for layer', layer);
    }

    return esriLayer;
};
