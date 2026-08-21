import { ReactCompareSlider, ReactCompareSliderHandle } from 'react-compare-slider';
import './BeforeAfterSlider.css';

/**
 * Reusable drag-to-reveal comparison slider. `before`/`after` accept any
 * React node — pass an <img> once real photography is available, or a
 * placeholder swatch in the meantime.
 */
export default function BeforeAfterSlider({ before, after, beforeLabel = 'Before', afterLabel = 'After' }) {
  return (
    <div className="ba-slider">
      <span className="ba-slider__badge ba-slider__badge--before">{beforeLabel}</span>
      <span className="ba-slider__badge ba-slider__badge--after">{afterLabel}</span>
      <ReactCompareSlider
        itemOne={before}
        itemTwo={after}
        handle={
          <ReactCompareSliderHandle
            style={{ '--rcs-handle-color': '#c9a15a' }}
            buttonStyle={{ backgroundColor: '#0d0d0d', width: '3rem', height: '3rem' }}
            linesStyle={{ boxShadow: 'none' }}
          />
        }
      />
    </div>
  );
}
