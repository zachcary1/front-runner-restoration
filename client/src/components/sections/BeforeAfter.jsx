import SectionEyebrow from '../shared/SectionEyebrow.jsx';
import BeforeAfterSlider from '../shared/BeforeAfterSlider.jsx';
import './BeforeAfter.css';

export default function BeforeAfter() {
  return (
    <section className="section before-after reveal" id="before-after">
      <div className="section-inner">
        <div className="before-after__heading">
          <SectionEyebrow>The Work Speaks Clearly</SectionEyebrow>
          <h2>See The Difference Fast Restoration Makes.</h2>
          <p>
            Drag the handle to compare on-site conditions before our crews arrive
            against the finished, fully restored result.
          </p>
        </div>

        <BeforeAfterSlider
          before={
            <img
              className="before-after__pane"
              src="/living-before.png"
              alt="Flooded living room before restoration"
            />
          }
          after={
            <img
              className="before-after__pane"
              src="/living-after.png"
              alt="Restored living room after cleanup"
            />
          }
        />
      </div>
    </section>
  );
}
