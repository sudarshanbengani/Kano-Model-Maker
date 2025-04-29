import React, { useRef, useEffect } from 'react';
import { useKanoModel, Feature, FeatureType } from '../context/KanoModelContext';
import { getFeatureColor, getFeaturePosition } from '../utils/kanoUtils';

const KanoChart: React.FC = () => {
  const { features } = useKanoModel();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Function to draw the Kano model
  const drawKanoModel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Get canvas dimensions
    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw background grid
    drawGrid(ctx, width, height, padding);
    
    // Draw axes
    drawAxes(ctx, width, height, padding);
    
    // Draw labels
    drawLabels(ctx, width, height, padding);
    
    // Draw Kano model regions
    drawKanoRegions(ctx, width, height, padding);
    
    // Draw features
    drawFeatures(ctx, features, width, height, padding);
  };
  
  // Draw grid
  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number, padding: number) => {
    ctx.beginPath();
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 0.5;
    
    // Vertical grid lines
    for (let x = padding; x <= width - padding; x += (width - 2 * padding) / 10) {
      ctx.moveTo(x, padding);
      ctx.lineTo(x, height - padding);
    }
    
    // Horizontal grid lines
    for (let y = padding; y <= height - padding; y += (height - 2 * padding) / 10) {
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
    }
    
    ctx.stroke();
  };
  
  // Draw axes
  const drawAxes = (ctx: CanvasRenderingContext2D, width: number, height: number, padding: number) => {
    ctx.beginPath();
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;
    
    // X-axis
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    
    // Y-axis
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(padding, padding);
    
    ctx.stroke();
    
    // Draw axis arrows
    ctx.beginPath();
    
    // X-axis arrow
    ctx.moveTo(width - padding, height - padding);
    ctx.lineTo(width - padding - 10, height - padding - 5);
    ctx.lineTo(width - padding - 10, height - padding + 5);
    ctx.closePath();
    
    // Y-axis arrow
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding - 5, padding + 10);
    ctx.lineTo(padding + 5, padding + 10);
    ctx.closePath();
    
    ctx.fillStyle = '#64748b';
    ctx.fill();
  };
  
  // Draw labels
  const drawLabels = (ctx: CanvasRenderingContext2D, width: number, height: number, padding: number) => {
    ctx.fillStyle = '#334155';
    ctx.font = '12px Inter, sans-serif';
    ctx.textAlign = 'center';
    
    // X-axis label
    ctx.fillText('Product Functionality', width / 2, height - padding + 25);
    ctx.fillText('None', padding, height - padding + 25);
    ctx.fillText('Best', width - padding, height - padding + 25);
    
    // Y-axis label
    ctx.save();
    ctx.translate(padding - 25, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Customer Delight', 0, 0);
    ctx.restore();
    
    ctx.textAlign = 'right';
    ctx.fillText('Low', padding - 10, height - padding);
    
    ctx.textAlign = 'right';
    ctx.fillText('High', padding - 10, padding + 5);
  };
  
  // Draw Kano model regions
  const drawKanoRegions = (ctx: CanvasRenderingContext2D, width: number, height: number, padding: number) => {
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;
    
    // Set up gradient for regions
    const regionColors = {
      basic: 'rgba(239, 68, 68, 0.1)',
      performance: 'rgba(59, 130, 246, 0.1)',
      excitement: 'rgba(139, 92, 246, 0.1)',
    };
    
    // Basic features region (horizontal line near bottom)
    ctx.beginPath();
    ctx.fillStyle = regionColors.basic;
    ctx.moveTo(padding, height - padding - chartHeight * 0.1);
    ctx.lineTo(width - padding, height - padding - chartHeight * 0.2);
    ctx.lineTo(width - padding, height - padding);
    ctx.lineTo(padding, height - padding);
    ctx.closePath();
    ctx.fill();
    
    // Performance features region (diagonal line)
    ctx.beginPath();
    ctx.fillStyle = regionColors.performance;
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding - chartHeight * 0.8);
    ctx.lineTo(width - padding, height - padding - chartHeight * 0.2);
    ctx.lineTo(padding, height - padding - chartHeight * 0.1);
    ctx.closePath();
    ctx.fill();
    
    // Excitement features region (curved line at the top)
    ctx.beginPath();
    ctx.fillStyle = regionColors.excitement;
    ctx.moveTo(padding, height - padding - chartHeight * 0.1);
    ctx.bezierCurveTo(
      padding + chartWidth * 0.4, height - padding - chartHeight * 0.1,
      padding + chartWidth * 0.6, height - padding - chartHeight * 0.5,
      width - padding, height - padding - chartHeight * 0.8
    );
    ctx.lineTo(width - padding, padding);
    ctx.lineTo(padding, padding);
    ctx.closePath();
    ctx.fill();
    
    // Add region labels
    ctx.font = 'bold 14px Inter, sans-serif';
    ctx.fillStyle = 'rgba(100, 116, 139, 0.8)';
    
    // Basic label
    ctx.fillText('Basic', padding + chartWidth * 0.2, height - padding - chartHeight * 0.05);
    
    // Performance label
    ctx.fillText('Performance', padding + chartWidth * 0.5, height - padding - chartHeight * 0.4);
    
    // Excitement label
    ctx.fillText('Excitement', padding + chartWidth * 0.75, height - padding - chartHeight * 0.7);
  };
  
  // Draw features on the chart
  const drawFeatures = (ctx: CanvasRenderingContext2D, features: Feature[], width: number, height: number, padding: number) => {
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;
    
    features.forEach((feature) => {
      const { x: relativeX, y: relativeY } = getFeaturePosition(feature);
      
      // Convert relative positions to canvas coordinates
      const x = padding + relativeX * chartWidth;
      const y = (height - padding) - relativeY * chartHeight;
      
      // Calculate point size based on weightage (3-12px)
      const pointSize = 3 + feature.weightage * 0.9;
      
      // Draw feature point
      ctx.beginPath();
      ctx.arc(x, y, pointSize, 0, Math.PI * 2);
      ctx.fillStyle = getFeatureColor(feature.type);
      ctx.fill();
      
      // Draw white border
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw feature name
      ctx.font = '12px Inter, sans-serif';
      ctx.fillStyle = '#1e293b';
      ctx.textAlign = 'center';
      ctx.fillText(feature.name, x, y - pointSize - 5);
    });
  };
  
  // Handle window resize to maintain proper drawing
  useEffect(() => {
    const resizeCanvas = () => {
      if (canvasRef.current) {
        const container = canvasRef.current.parentElement;
        if (container) {
          canvasRef.current.width = container.clientWidth;
          canvasRef.current.height = container.clientHeight;
          drawKanoModel();
        }
      }
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);
  
  // Redraw whenever features change
  useEffect(() => {
    drawKanoModel();
  }, [features]);
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden h-full">
      <div className="p-6 border-b border-slate-200">
        <h2 className="text-xl font-semibold">Kano Model Chart</h2>
        <p className="text-sm text-slate-600 mt-1">
          Visualizing features based on functionality and customer satisfaction
        </p>
      </div>
      <div className="p-2 h-[500px]">
        <canvas 
          ref={canvasRef} 
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default KanoChart;