import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface RegionData {
  name: string
  code: string
  value: number
}

interface GeoFeature {
  type: string;
  properties?: {
    name?: string
    st_nm?: string
    [key: string]: unknown
  }
  geometry: {
    type: string;
    coordinates: number[][][] | number[][][][];
  };
}

interface GeoFeatureCollection {
  type: string;
  features: GeoFeature[];
}

interface TopoJSON {
  feature: (topology: unknown, object: unknown) => GeoFeatureCollection
}

interface CountryConfig {
  topoJsonUrl: string
  topoJsonObject: string
  projectionType: 'geoAlbersUsa' | 'geoMercator' | 'geoAlbers' | 'geoEquirectangular'
  nameProperty: string
  scale: number
  center?: [number, number]
  subdivisionName: string
  hasInsets?: boolean
}

declare global {
  interface Window {
    topojson?: TopoJSON;
  }
}

const COUNTRY_CONFIGS: Record<string, CountryConfig> = {
  'USA': {
    topoJsonUrl: 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json',
    topoJsonObject: 'states',
    projectionType: 'geoAlbersUsa',
    nameProperty: 'name',
    scale: 1400,
    subdivisionName: 'State',
    hasInsets: true
  },
  'India': {
    topoJsonUrl: 'https://gist.githubusercontent.com/jbrobst/56c13bbbf9d97d187fea01ca62ea5112/raw/e388c4cae20aa53cb5090210a42ebb9b765c0a36/india_states.geojson',
    topoJsonObject: 'india-states',
    projectionType: 'geoMercator',
    nameProperty: 'ST_NM',
    scale: 1200,
    center: [78.0, 22.0],
    subdivisionName: 'State'
  }
}

const US_STATE_CODES = new Map([
  ["California", "CA"],
  ["Texas", "TX"],
  ["Florida", "FL"],
  ["New York", "NY"],
  ["Pennsylvania", "PA"],
  ["Illinois", "IL"],
  ["Ohio", "OH"],
  ["Georgia", "GA"],
  ["North Carolina", "NC"],
  ["Michigan", "MI"],
  ["New Jersey", "NJ"],
  ["Virginia", "VA"],
  ["Washington", "WA"],
  ["Arizona", "AZ"],
  ["Massachusetts", "MA"],
  ["Tennessee", "TN"],
  ["Indiana", "IN"],
  ["Maryland", "MD"],
  ["Missouri", "MO"],
  ["Wisconsin", "WI"],
  ["Colorado", "CO"],
  ["Minnesota", "MN"],
  ["South Carolina", "SC"],
  ["Alabama", "AL"],
  ["Louisiana", "LA"],
  ["Kentucky", "KY"],
  ["Oregon", "OR"],
  ["Oklahoma", "OK"],
  ["Connecticut", "CT"],
  ["Utah", "UT"],
  ["Nevada", "NV"],
  ["Arkansas", "AR"],
  ["Mississippi", "MS"],
  ["Kansas", "KS"],
  ["New Mexico", "NM"],
  ["Nebraska", "NE"],
  ["West Virginia", "WV"],
  ["Idaho", "ID"],
  ["Hawaii", "HI"],
  ["New Hampshire", "NH"],
  ["Maine", "ME"],
  ["Iowa", "IA"],
  ["Rhode Island", "RI"],
  ["Montana", "MT"],
  ["Delaware", "DE"],
  ["South Dakota", "SD"],
  ["North Dakota", "ND"],
  ["Alaska", "AK"],
  ["Vermont", "VT"],
  ["Wyoming", "WY"],
]);

const INDIA_STATE_CODES = new Map([
  ["Andaman & Nicobar", "AN"],
  ["Andhra Pradesh", "AP"],
  ["Arunachal Pradesh", "AR"],
  ["Assam", "AS"],
  ["Bihar", "BR"],
  ["Chandigarh", "CH"],
  ["Chhattisgarh", "CG"],
  ["Dadra & Nagar Haveli", "DN"],
  ["Daman & Diu", "DD"],
  ["Delhi", "DL"],
  ["Goa", "GA"],
  ["Gujarat", "GJ"],
  ["Haryana", "HR"],
  ["Himachal Pradesh", "HP"],
  ["Jammu & Kashmir", "JK"],
  ["Jharkhand", "JH"],
  ["Karnataka", "KA"],
  ["Kerala", "KL"],
  ["Lakshadweep", "LD"],
  ["Madhya Pradesh", "MP"],
  ["Maharashtra", "MH"],
  ["Manipur", "MN"],
  ["Meghalaya", "ML"],
  ["Mizoram", "MZ"],
  ["Nagaland", "NL"],
  ["Orissa", "OR"],
  ["Odisha", "OD"],
  ["Puducherry", "PY"],
  ["Punjab", "PB"],
  ["Rajasthan", "RJ"],
  ["Sikkim", "SK"],
  ["Tamil Nadu", "TN"],
  ["Tripura", "TR"],
  ["Uttar Pradesh", "UP"],
  ["Uttarakhand", "UK"],
  ["Uttaranchal", "UT"],
  ["West Bengal", "WB"],
  ["Telangana", "TG"],
])

const SAMPLE_US_DATA: RegionData[] = [
  { name: "California", code: "CA", value: 20 },
  { name: "New York", code: "NY", value: 10 },
]

const SAMPLE_INDIA_DATA: RegionData[] = [
  { name: "Maharashtra", code: "MH", value: 250 },
  { name: "Karnataka", code: "KA", value: 180 },
  { name: "Tamil Nadu", code: "TN", value: 165 },
  { name: "Delhi", code: "DL", value: 150 },
]

interface ChoroplethMapProps {
  country?: string
  regionData?: RegionData[]
  title?: string
}

export default function ChoroplethMap({ 
  country = 'USA',
  regionData,
  title
}: ChoroplethMapProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const config = COUNTRY_CONFIGS[country] || COUNTRY_CONFIGS['USA']
  const stateCodes = country === 'India' ? INDIA_STATE_CODES : US_STATE_CODES
  const defaultData = country === 'India' ? SAMPLE_INDIA_DATA : SAMPLE_US_DATA
  const data = regionData || defaultData
  const displayTitle = title || `Session by ${country}`
  
  const [stateData, setStateData] = useState<Map<string, RegionData>>(new Map(data.map((d) => [d.code, d])))
  const [selectedState, setSelectedState] = useState<RegionData | null>(data[0])
  const [topology, setTopology] = useState<{ objects: { [key: string]: unknown } } | null>(null)
  const [geoJsonData, setGeoJsonData] = useState<GeoFeatureCollection | null>(null)
  const [topoJsonLoaded, setTopoJsonLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [tooltipState, setTooltipState] = useState<{ visible: boolean; x: number; y: number; text: string }>({
    visible: false,
    x: 0,
    y: 0,
    text: "",
  })

  // Update data when props change
  useEffect(() => {
    const currentData = regionData || (country === 'India' ? SAMPLE_INDIA_DATA : SAMPLE_US_DATA)
    setStateData(new Map(currentData.map((d) => [d.code, d])))
    if (currentData.length > 0) {
      setSelectedState(currentData[0])
    }
  }, [regionData, country])

  // Load TopoJSON library
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/topojson/3.0.2/topojson.min.js";
    script.async = true;
    script.onload = () => setTopoJsonLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Fetch topology
  useEffect(() => {
    if (!topoJsonLoaded) return
    
    setTopology(null) // Reset topology when country changes
    setIsLoading(true)
    setError(null)
    
    fetch(config.topoJsonUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch topology: ${res.statusText}`)
        }
        return res.json()
      })
      .then((data: { objects?: { [key: string]: unknown }, type?: string, features?: unknown[] }) => {
        console.log('Topology loaded:', data)
        
        // Handle GeoJSON format - use directly with D3
        if (data.type === 'FeatureCollection' && data.features) {
          console.log('Detected GeoJSON format, using directly...')
          setGeoJsonData(data as GeoFeatureCollection)
          setTopology(null)
        } else if (data.objects) {
          console.log('Available objects:', Object.keys(data.objects))
          setTopology(data as { objects: { [key: string]: unknown } })
          setGeoJsonData(null)
        } else {
          throw new Error('Invalid TopoJSON structure')
        }
        setIsLoading(false)
      })
      .catch((err) => {
        console.error("Error loading topology:", err)
        setError(`Failed to load map data: ${err.message}`)
        setIsLoading(false)
        // Try alternative source for India
        if (country === 'India') {
          console.log('Trying alternative India TopoJSON sources...')
          const alternativeUrls = [
            'https://cdn.jsdelivr.net/npm/india-atlas@1/india-states.json',
            'https://raw.githubusercontent.com/geohacker/india/master/state/india_state.topojson',
            'https://gist.githubusercontent.com/jbrobst/56c13bbbf9d97d187fea01ca62ea5112/raw/e388c4cae20aa53cb5090210a42ebb9b765c0a36/india_states.geojson'
          ]
          
          const tryNextUrl = (urlIndex: number) => {
            if (urlIndex >= alternativeUrls.length) {
              console.error('All alternative TopoJSON sources failed')
              return
            }
            
            fetch(alternativeUrls[urlIndex])
              .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`)
                return res.json()
              })
              .then((data: { objects?: { [key: string]: unknown }, type?: string, features?: unknown[] }) => {
                console.log('Alternative topology loaded from:', alternativeUrls[urlIndex])
                
                // Handle GeoJSON format - use directly with D3
                if (data.type === 'FeatureCollection' && data.features) {
                  console.log('Detected GeoJSON format, using directly...')
                  setGeoJsonData(data as GeoFeatureCollection)
                  setTopology(null)
                  setIsLoading(false)
                  setError(null)
                } else if (data.objects) {
                  console.log('Available objects:', Object.keys(data.objects))
                  setTopology(data as { objects: { [key: string]: unknown } })
                  setGeoJsonData(null)
                  setIsLoading(false)
                  setError(null)
                } else {
                  throw new Error('Invalid TopoJSON structure')
                }
              })
              .catch((altErr) => {
                console.error(`Error loading alternative topology from ${alternativeUrls[urlIndex]}:`, altErr)
                if (urlIndex === alternativeUrls.length - 1) {
                  setError('Failed to load India map data from all sources')
                  setIsLoading(false)
                }
                tryNextUrl(urlIndex + 1)
              })
          }
          
          tryNextUrl(0)
        }
      })
  }, [topoJsonLoaded, config.topoJsonUrl, country, config.topoJsonObject])

  // Render map with responsive sizing
  useEffect(() => {
    if (!svgRef.current || (!topology && !geoJsonData) || !containerRef.current) return
    // Only require topojson if using TopoJSON format
    if (topology && !topoJsonLoaded) return
    if (topology && !window.topojson) return

    const container = containerRef.current
    let containerWidth = container.clientWidth
    let containerHeight = container.clientHeight
    
    // Ensure minimum dimensions
    if (containerWidth === 0) containerWidth = 800
    if (containerHeight === 0) containerHeight = 500

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Create projection based on country
    if (config.projectionType === 'geoAlbersUsa' && country === 'USA') {
      const mainGroup = svg.append("g")
      const alaskaGroup = svg.append("g")
      const hawaiiGroup = svg.append("g")

      const mainProjection = d3.geoAlbersUsa()
        .scale((containerWidth / 960) * config.scale)
        .translate([containerWidth / 2, containerHeight * 0.48])

      const alaskaProjection = d3.geoAlbers()
        .rotate([154, 0])
        .center([-2, 58.5])
        .parallels([55, 65])
        .scale((containerWidth / 960) * 700)
        .translate([containerWidth * 0.15, containerHeight * 1])

      const hawaiiProjection = d3.geoAlbers()
        .rotate([157, 0])
        .center([-3, 19.9])
        .parallels([8, 18])
        .scale((containerWidth / 960) * 1500)
        .translate([containerWidth * 0.3, containerHeight * 1])

      const mainPath = d3.geoPath().projection(mainProjection)
      const alaskaPath = d3.geoPath().projection(alaskaProjection)
      const hawaiiPath = d3.geoPath().projection(hawaiiProjection)

      const maxValue = Math.max(...Array.from(stateData.values()).map((d) => d.value))
      const colorScale = d3.scaleLinear<string>().domain([0, maxValue]).range(["#f0f0f0", "#76C2F9"])

      if (!topology || !window.topojson) return
      const states = window.topojson.feature(topology, topology.objects[config.topoJsonObject])

      svg.attr("width", containerWidth).attr("height", containerHeight)

      const renderStates = (
        group: d3.Selection<SVGGElement, unknown, null, undefined>,
        path: d3.GeoPath,
        filter?: (name: string) => boolean
      ) => {
        group
          .selectAll("path")
          .data(states.features.filter((d) => !filter || filter(d.properties?.name || "")))
          .enter()
          .append("path")
          .attr("d", (d) => path(d as d3.GeoPermissibleObjects) || "")
          .attr("fill", (d) => {
            const name = d.properties?.name || ""
            const code = stateCodes.get(name)
            if (!code) return "#e5e7eb"
            const data = stateData.get(code)
            return data ? colorScale(data.value) : "#e5e7eb"
          })
          .attr("stroke", "#ffffff")
          .attr("stroke-width", 0.75)
          .style("cursor", "pointer")
          .on("mouseenter", function(event: MouseEvent, d) {
            const name = d.properties?.name || ""
            const code = stateCodes.get(name)
            if (code && stateData.has(code)) {
              const data = stateData.get(code)!
              setSelectedState(data)
              d3.select(this).attr("opacity", 0.8)
            }
          })
          .on("mouseleave", function() {
            d3.select(this).attr("opacity", 1)
            setTooltipState({ visible: false, x: 0, y: 0, text: "" })
          })
          .on("mousemove", function(event: MouseEvent, d) {
            const name = d.properties?.name || ""
            const code = stateCodes.get(name)
            if (code && stateData.has(code)) {
              const data = stateData.get(code)!
              const [x, y] = d3.pointer(event, container)
              setTooltipState({
                visible: true,
                x: x,
                y: y,
                text: `${data.code}: ${data.value}`,
              })
            }
          })
      }

      renderStates(mainGroup, mainPath, (name) => name !== "Alaska" && name !== "Hawaii")
      renderStates(alaskaGroup, alaskaPath, (name) => name === "Alaska")
      renderStates(hawaiiGroup, hawaiiPath, (name) => name === "Hawaii")
    } else {
      // Standard projection for India and other countries
      let projection: d3.GeoProjection

      if (config.projectionType === 'geoMercator') {
        projection = d3.geoMercator()
      } else if (config.projectionType === 'geoAlbers') {
        projection = d3.geoAlbers()
      } else {
        projection = d3.geoEquirectangular()
      }

      // Get features from TopoJSON or use GeoJSON directly
      let features: GeoFeatureCollection
      if (geoJsonData) {
        features = geoJsonData
      } else if (topology && window.topojson) {
        // Try to find the correct TopoJSON object
        let topoObject = topology.objects[config.topoJsonObject]
        if (!topoObject && country === 'India') {
          // Try alternative keys for India
          const possibleKeys = ['india-states', 'st99_d00', 'india_state', 'states', 'INDIA', 'india_states']
          for (const key of possibleKeys) {
            if (topology.objects[key]) {
              console.log(`Using alternative TopoJSON object key: ${key}`)
              topoObject = topology.objects[key]
              break
            }
          }
        }
        
        if (!topoObject) {
          console.error(`TopoJSON object "${config.topoJsonObject}" not found. Available objects:`, Object.keys(topology.objects))
          // Try using the first available object as fallback
          const availableKeys = Object.keys(topology.objects)
          if (availableKeys.length > 0) {
            console.log(`Attempting to use first available object: ${availableKeys[0]}`)
            topoObject = topology.objects[availableKeys[0]]
          } else {
            console.error('No valid data source available')
            return
          }
        }
        
        features = window.topojson.feature(topology, topoObject)
      } else {
        console.error('No valid data source available')
        return
      }
      
      if (!features || !features.features || features.features.length === 0) {
        console.error('No features found')
        return
      }

      console.log('Features loaded:', features.features.length)
      console.log('Sample feature:', features.features[0])
      console.log('Container dimensions:', containerWidth, containerHeight)

      // Get geographic bounds first
      const geoBounds = d3.geoBounds(features as d3.GeoPermissibleObjects)
      console.log('Geographic bounds:', geoBounds)
      
      // Calculate center from bounds
      const centerLon = (geoBounds[0][0] + geoBounds[1][0]) / 2
      const centerLat = (geoBounds[0][1] + geoBounds[1][1]) / 2
      
      // Calculate geographic extent
      const lonRange = geoBounds[1][0] - geoBounds[0][0]
      const latRange = geoBounds[1][1] - geoBounds[0][1]
      
      console.log('Lon range:', lonRange, 'Lat range:', latRange)
      
      // Set up projection with center
      projection.center([centerLon, centerLat])
      
      // Use a temporary path to calculate proper scale
      // We'll use an iterative approach or calculate based on geographic extent
      const tempPath = d3.geoPath().projection(projection)
      
      // Use d3.geoPath().bounds() to automatically fit the map
      // First, set center and a reasonable initial scale
      projection.center([centerLon, centerLat])
      
      // Use a much larger initial scale to get proper bounds
      const initialScale = 2000
      projection
        .scale(initialScale)
        .translate([containerWidth / 2, containerHeight / 2])
      
      // Calculate bounds with this projection
      const testBounds = tempPath.bounds(features as d3.GeoPermissibleObjects)
      
      console.log('Initial projected bounds:', testBounds)
      
      if (testBounds && testBounds.length >= 2) {
        const testDx = testBounds[1][0] - testBounds[0][0]
        const testDy = testBounds[1][1] - testBounds[0][1]
        
        console.log('Test bounds dimensions:', testDx, testDy)
        
        if (testDx > 0 && testDy > 0 && isFinite(testDx) && isFinite(testDy)) {
          // Calculate scale factor to fit 98% of container (larger map)
          const padding = 0.98
          const scaleFactorX = (containerWidth * padding) / testDx
          const scaleFactorY = (containerHeight * padding) / testDy
          const scaleFactor = Math.min(scaleFactorX, scaleFactorY)
          
          // Calculate final scale
          const finalScale = initialScale * scaleFactor
          
          console.log('Scale factor:', scaleFactor, 'Final scale:', finalScale)
          
          // Set the final scale and keep translate at center for now
          projection
            .scale(finalScale)
            .translate([containerWidth / 2, containerHeight / 2])
          
          // Recalculate bounds with final scale to get proper center
          // We need to recalculate the path generator since projection changed
          const finalPath = d3.geoPath().projection(projection)
          const finalBounds = finalPath.bounds(features as d3.GeoPermissibleObjects)
          
          if (finalBounds && finalBounds.length >= 2) {
            const boundsMinX = finalBounds[0][0]
            const boundsMinY = finalBounds[0][1]
            const boundsMaxX = finalBounds[1][0]
            const boundsMaxY = finalBounds[1][1]
            const boundsWidth = boundsMaxX - boundsMinX
            const boundsHeight = boundsMaxY - boundsMinY
            const boundsCenterX = (boundsMinX + boundsMaxX) / 2
            const boundsCenterY = (boundsMinY + boundsMaxY) / 2
            
            const containerCenterX = containerWidth / 2
            const containerCenterY = containerHeight / 2
            
            console.log('Final bounds:', { min: [boundsMinX, boundsMinY], max: [boundsMaxX, boundsMaxY], width: boundsWidth, height: boundsHeight })
            console.log('Final bounds center:', [boundsCenterX, boundsCenterY])
            console.log('Container center:', [containerCenterX, containerCenterY])
            
            // Calculate translate to center the bounds in the container
            // The current translate is [containerWidth/2, containerHeight/2]
            // We need to adjust it by the difference between bounds center and container center
            const translateX = containerCenterX - boundsCenterX
            const translateY = containerCenterY - boundsCenterY
            
            // Add the offset to the current translate (which is at container center)
            const finalTranslateX = containerCenterX + translateX
            const finalTranslateY = containerCenterY + translateY
            
            console.log('Bounds offset:', [translateX, translateY])
            console.log('Final translate:', [finalTranslateX, finalTranslateY])
            
            // Update translate to center the map
            projection.translate([finalTranslateX, finalTranslateY])
            
            // Create a new path with the updated projection to verify
            const verifyPath = d3.geoPath().projection(projection)
            const verifyBounds = verifyPath.bounds(features as d3.GeoPermissibleObjects)
            if (verifyBounds) {
              const verifyCenterX = (verifyBounds[0][0] + verifyBounds[1][0]) / 2
              const verifyCenterY = (verifyBounds[0][1] + verifyBounds[1][1]) / 2
              console.log('Verified bounds center after translate:', [verifyCenterX, verifyCenterY])
              console.log('Should be close to container center:', [containerCenterX, containerCenterY])
              console.log('Difference:', [Math.abs(verifyCenterX - containerCenterX), Math.abs(verifyCenterY - containerCenterY)])
            }
          } else {
            console.warn('Could not calculate final bounds, centering at container center')
            projection.translate([containerWidth / 2, containerHeight / 2])
          }
        } else {
          console.warn('Invalid test bounds dimensions, using fallback')
          projection
            .scale(1200)
            .center([centerLon, centerLat])
            .translate([containerWidth / 2, containerHeight / 2])
        }
      } else {
        console.warn('Could not get test bounds, using fallback')
        projection
          .scale(1200)
          .center([centerLon, centerLat])
          .translate([containerWidth / 2, containerHeight / 2])
      }

      const path = d3.geoPath().projection(projection)
      const maxValue = Math.max(...Array.from(stateData.values()).map((d) => d.value), 1)
      const colorScale = d3.scaleLinear<string>().domain([0, maxValue]).range(["#f0f0f0", "#76C2F9"])

      svg.attr("width", containerWidth).attr("height", containerHeight)

      const paths = svg
        .selectAll("path")
        .data(features.features)
        .enter()
        .append("path")
        .attr("d", (d) => {
          const pathData = path(d as d3.GeoPermissibleObjects)
          if (!pathData) {
            console.warn('Empty path for feature:', d)
          }
          return pathData || ""
        })
        .attr("fill", (d) => {
          // Try multiple property names for India (ST_NM for GeoJSON, st_nm for TopoJSON)
          const name = (d.properties?.[config.nameProperty] as string) || 
                      (country === 'India' ? (d.properties?.ST_NM as string) || (d.properties?.st_nm as string) : "") || ""
          const code = stateCodes.get(name)
          if (!code) {
            // Log unmapped states for debugging
            if (country === 'India' && name) {
              console.log(`Unmapped state: "${name}"`)
            }
            return "#e5e7eb"
          }
          const data = stateData.get(code)
          return data ? colorScale(data.value) : "#e5e7eb"
        })
        .attr("stroke", "#ffffff")
        .attr("stroke-width", 0.75)
        .style("cursor", "pointer")
        .on("mouseenter", function(event: MouseEvent, d) {
          const name = (d.properties?.[config.nameProperty] as string) || 
                      (country === 'India' ? (d.properties?.ST_NM as string) || (d.properties?.st_nm as string) : "") || ""
          const code = stateCodes.get(name)
          if (code && stateData.has(code)) {
            const data = stateData.get(code)!;
            setSelectedState(data);
            d3.select(this).attr("opacity", 0.8);
          }
        })
        .on("mouseleave", function () {
          d3.select(this).attr("opacity", 1);
          setTooltipState({ visible: false, x: 0, y: 0, text: "" });
        })
        .on("mousemove", function(event: MouseEvent, d) {
          const name = (d.properties?.[config.nameProperty] as string) || 
                      (country === 'India' ? (d.properties?.ST_NM as string) || (d.properties?.st_nm as string) : "") || ""
          const code = stateCodes.get(name)
          if (code && stateData.has(code)) {
            const data = stateData.get(code)!;
            const [x, y] = d3.pointer(event, container);
            setTooltipState({
              visible: true,
              x: x,
              y: y,
              text: `${data.code}: ${data.value}`,
            });
          }
        })
      
      console.log('Paths created:', paths.size())
    }
  }, [topology, geoJsonData, stateData, topoJsonLoaded, config, country, stateCodes, windowSize])

  // Handle window resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    // Set initial size
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const sortedStates = Array.from(stateData.values()).sort(
    (a, b) => b.value - a.value
  );

  return (
    <div className="flex bg-white" style={{ height: '750px', minHeight: '750px' }}>
      <div className="flex-1 flex flex-col p-8">
        <div className="mb-6">
          <h1 className="text-base font-normal text-black">{displayTitle}</h1>
        </div>

        <div ref={containerRef} className="flex-1 relative" style={{ minHeight: '500px' }}>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <div className="text-gray-500 mb-2">Loading map...</div>
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              </div>
            </div>
          )}
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
              <div className="text-center text-red-500">
                <div className="mb-2">{error}</div>
                <div className="text-sm text-gray-500">Please check the console for details</div>
              </div>
            </div>
          )}
          <svg ref={svgRef} className="w-full h-full" style={{ minHeight: '500px' }} />
          {tooltipState.visible && (
            <div
              className="absolute bg-black text-white px-4 py-2 rounded text-sm font-semibold pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${tooltipState.x}px`,
                top: `${tooltipState.y}px`,
              }}
            >
              {tooltipState.text}
            </div>
          )}
        </div>
      </div>

      <div className="w-64 bg-white p-6 flex flex-col overflow-y-auto border-l border-gray-100">
        <div className="flex items-center gap-2 mb-6 pb-4">
          <button className="text-gray-600 hover:text-gray-900">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <span className="text-base font-normal text-black">{country}</span>
        </div>

        <div className="space-y-3">
          {sortedStates.map((state) => (
            <div
              key={state.code}
              className="cursor-pointer transition-colors"
              onMouseEnter={() => setSelectedState(state)}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-normal text-gray-900">
                  {state.code} <span className="text-gray-500">{">"}</span>
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  {state.value}
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${
                      (state.value /
                        Math.max(...sortedStates.map((s) => s.value))) *
                      100
                    }%`,
                    backgroundColor: "#76C2F9",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Color Scale
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">Low</span>
              <span className="text-xs text-gray-600">High</span>
            </div>
            <div
              className="h-3 rounded"
              style={{
                background: "linear-gradient(to right, #f0f0f0, #76C2F9)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
