/* *
 *
 *  FlowMap
 *
 *  (c) 2018-2022 Askel Eirik Johansson
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */

/* *
 *
 *  Imports
 *
 * */

import type ColorType from '../../Core/Color/ColorType';
import type MapLinePointOptions from '../MapLine/MapLinePointOptions';

/* *
 *
 *  Declarations
 *
 * */

export interface FlowMapPointOptions extends MapLinePointOptions {
    curveFactor?: number;
    fillColor?: ColorType;
    fillOpacity: number;
    from?: string;
    growTowards?: boolean;
    markerEnd?: MarkerEndOptions;
    opacity?: number;
    to?: string;
    weight?: number;
}

export interface MarkerEndOptions {
    markerType?: string,
    enabled?: boolean,
    width: number | string,
    height: number | string
}

export default FlowMapPointOptions;
