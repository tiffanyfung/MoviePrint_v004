import React from 'react';
import { Button, Checkbox, Divider, Dropdown, Popup, Radio } from 'semantic-ui-react';
import Slider, { Handle, createSliderWithTooltip } from 'rc-slider';
import Tooltip from 'rc-tooltip';
import {
  FACE_UNIQUENESS_THRESHOLD,
  FACE_SIZE_THRESHOLD,
  FILTER_METHOD,
  SHEET_VIEW,
  SHEET_TYPE,
  SORT_METHOD,
  THUMB_INFO_OPTIONS,
  THUMB_SELECTION,
  VIEW,
} from '../utils/constants';
import styles from './FloatingMenu.css';
import stylesPop from './Popup.css';
import iconCutView from '../img/icon-cut-view.svg';
import iconThumbView from '../img/icon-thumb-view.svg';
import iconHeader from '../img/icon-header.svg';
import iconImage from '../img/icon-image.svg';
import iconNoImage from '../img/icon-no-image.svg';
import iconFrameInfo from '../img/icon-frame-info.svg';
import iconShowFaceRect from '../img/icon-show-face-rect.svg';
import iconCaretDown from '../img/icon-caret-down.svg';
import iconArrowUp from '../img/icon-arrow-up.svg';
import iconHide from '../img/icon-hide.svg';
import iconUnhide from '../img/icon-unhide.svg';
import iconExpand from '../img/icon-expand.svg';
import iconZoomIn from '../img/icon-zoom-in.svg';
import iconZoomOut from '../img/icon-zoom-out.svg';
import iconResizeVertical from '../img/icon-resize-vertical.svg';
import iconResizeHorizontal from '../img/icon-resize-horizontal.svg';
import iconSort from '../img/icon-sort.svg';
import iconFilter from '../img/icon-filter.svg';
import iconCopy from '../img/icon-copy.svg';
import iconGrid from '../img/icon-grid.svg';
import iconBarcode from '../img/icon-barcode.svg';
import iconAddInterval from '../img/icon-add-interval.svg';
import iconAddScene from '../img/icon-add-scene.svg';
import iconAddFace from '../img/icon-add-face.svg';
import icon2x2 from '../img/icon-2x2.svg';
import icon3x3 from '../img/icon-3x3.svg';
import icon4x4 from '../img/icon-4x4.svg';
import icon5x5 from '../img/icon-5x5.svg';
import icon6x6 from '../img/icon-6x6.svg';

const SliderWithTooltip = createSliderWithTooltip(Slider);
const Range = createSliderWithTooltip(Slider.Range);

const handle = props => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip prefixCls="rc-slider-tooltip" overlay={value} visible placement="top" key={index}>
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

const FloatingMenu = ({
  currentSheetFilter,
  fileMissingStatus,
  hasParent,
  onAddFaceSheetClick,
  onAddIntervalSheetClick,
  onBackToParentClick,
  onChangeDefaultZoomLevel,
  onChangeFaceUniquenessThreshold,
  onChangeSheetViewClick,
  onDuplicateSheetClick,
  onFilterSheet,
  onScanMovieListItemClick,
  onSetViewClick,
  onShowAllThumbs,
  onSortSheet,
  onThumbInfoClick,
  onToggleFaceRectClick,
  onToggleHeaderClick,
  onToggleImagesClick,
  onToggleShowHiddenThumbsClick,
  onUpdateSheetFilter,
  optimiseGridLayout,
  scaleValueObject,
  settings,
  sheetType,
  sheetView,
  visibilitySettings,
}) => {
  const {
    defaultFaceUniquenessThreshold = FACE_UNIQUENESS_THRESHOLD,
    defaultFaceSizeThreshold = FACE_SIZE_THRESHOLD,
    defaultThumbInfo,
    defaultShowImages,
  } = settings;
  const { defaultView, defaultZoomLevel, visibilityFilter } = visibilitySettings;
  const { moviePrintAspectRatioInv, containerAspectRatioInv } = scaleValueObject;
  const isGridViewAndDefault = sheetView === SHEET_VIEW.GRIDVIEW && defaultView === VIEW.STANDARDVIEW;
  const isFaceType = sheetType === SHEET_TYPE.FACES;
  const isShotType = sheetType === SHEET_TYPE.SCENES;

  const {
    [FILTER_METHOD.AGE]: ageFilter = {
      enabled: false,
      min: 20,
      max: 40,
    },
    [FILTER_METHOD.DISTTOORIGIN]: uniqueFilter = {
      enabled: false,
      value: 0,
    },
    [FILTER_METHOD.FACECOUNT]: faceCountFilter = {
      enabled: false,
      min: 1,
      max: 10,
    },
    [FILTER_METHOD.FACESIZE]: sizeFilter = {
      enabled: false,
      min: 50,
      max: 100,
    },
    [FILTER_METHOD.GENDER]: genderFilter = {
      enabled: false,
      value: 'female',
    },
    // unique: uniqueFilter,
    expanded: expandedFrameNumber,
  } = currentSheetFilter;

  const onFilterChange = (filterMethod, valueObject) => {
    const newFilters = {
      ...currentSheetFilter,
      [filterMethod]: {
        ...currentSheetFilter[filterMethod],
        ...valueObject,
      },
    };
    onFilterSheet(newFilters);
    onUpdateSheetFilter(newFilters);
  };

  return (
    <div className={`${styles.floatingMenu}`}>
      <Popup
        trigger={
          <Button
            className={`${styles.normalButton} ${styles.selected} ${
              hasParent && defaultView === VIEW.STANDARDVIEW ? '' : styles.hidden
            }`}
            style={{
              marginRight: '8px',
              marginLeft: '8px',
            }}
            size="large"
            circular
            data-tid="backToParentBtn"
            onClick={onBackToParentClick}
            icon={<img src={iconArrowUp} height="18px" alt="" />}
          />
        }
        mouseEnterDelay={1000}
        on={['hover']}
        position="bottom center"
        className={stylesPop.popup}
        content={<span>Back to parent MoviePrint</span>}
      />{' '}
      <Button.Group className={`${defaultView === VIEW.STANDARDVIEW ? '' : styles.hidden}`}>
        <Popup
          trigger={
            <Button
              className={styles.imageButton}
              size="large"
              data-tid="addShotDetectionMovieListItemBtn"
              onClick={() => onScanMovieListItemClick(undefined)}
              disabled={fileMissingStatus}
              icon={<img src={iconAddScene} height="18px" alt="" />}
            />
          }
          mouseEnterDelay={1000}
          on={['hover']}
          position="bottom center"
          className={stylesPop.popup}
          content="Add MoviePrint (shot detection based)"
        />
        <Popup
          trigger={
            <Dropdown
              button
              className={styles.dropDownButton}
              floating
              disabled={fileMissingStatus}
              icon={<img src={iconAddInterval} height="18px" alt="" />}
            >
              <Dropdown.Menu className={styles.dropDownMenu}>
                <Dropdown.Item className={styles.dropDownItem} onClick={() => onAddIntervalSheetClick(undefined, 4, 2)}>
                  <img src={icon2x2} height="18px" alt="" />
                  2x2
                </Dropdown.Item>
                <Dropdown.Item className={styles.dropDownItem} onClick={() => onAddIntervalSheetClick(undefined, 9, 3)}>
                  <img src={icon3x3} height="18px" alt="" />
                  3x3
                </Dropdown.Item>
                <Dropdown.Item
                  className={styles.dropDownItem}
                  onClick={() => onAddIntervalSheetClick(undefined, 16, 4)}
                >
                  <img src={icon4x4} height="18px" alt="" />
                  4x4
                </Dropdown.Item>
                <Dropdown.Item
                  className={styles.dropDownItem}
                  onClick={() => onAddIntervalSheetClick(undefined, 25, 5)}
                >
                  <img src={icon5x5} height="18px" alt="" />
                  5x5
                </Dropdown.Item>
                <Dropdown.Item
                  className={styles.dropDownItem}
                  onClick={() => onAddIntervalSheetClick(undefined, 36, 6)}
                >
                  <img src={icon6x6} height="18px" alt="" />
                  6x6
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          }
          mouseEnterDelay={1000}
          on={['hover']}
          position="right center"
          className={stylesPop.popup}
          content="Add MoviePrint (interval based)"
        />
        <Popup
          trigger={
            <Dropdown
              button
              className={styles.dropDownButton}
              floating
              disabled={fileMissingStatus}
              icon={<img src={iconAddFace} height="18px" alt="" />}
            >
              <Dropdown.Menu className={styles.dropDownMenu}>
                <Dropdown.Item
                  disabled={isFaceType}
                  className={styles.dropDownItem}
                  onClick={() => onAddFaceSheetClick('scanBetweenInAndOut', 0.01)}
                >
                  Scan every 100th frame between IN and OUT
                </Dropdown.Item>
                <Dropdown.Item
                  disabled={isFaceType}
                  className={styles.dropDownItem}
                  onClick={() => onAddFaceSheetClick('scanBetweenInAndOut', 0.1)}
                >
                  Scan every 10th frame between IN and OUT
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  disabled={isFaceType}
                  className={styles.dropDownItem}
                  onClick={() => onAddFaceSheetClick('scanFramesOfSheet')}
                >
                  Scan these thumbs
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          }
          mouseEnterDelay={1000}
          on={['hover']}
          position="right center"
          className={stylesPop.popup}
          content="Add MoviePrint (faces based)"
        />
      </Button.Group>{' '}
      <Button.Group className={`${defaultView === VIEW.STANDARDVIEW ? '' : styles.hidden}`}>
        <Popup
          trigger={
            <Dropdown
              button
              className={styles.dropDownButton}
              floating
              // closeOnBlur={false}
              // closeOnChange={false}
              disabled={fileMissingStatus || isShotType}
              icon={<img src={iconSort} height="18px" alt="" />}
            >
              <Dropdown.Menu className={styles.dropDownMenu}>
                <Dropdown.Item
                  className={styles.dropDownItem}
                  onClick={() => {
                    onSortSheet(SORT_METHOD.REVERSE);
                  }}
                >
                  Reverse sort
                </Dropdown.Item>
                <Dropdown.Item
                  className={styles.dropDownItem}
                  onClick={() => {
                    onSortSheet(SORT_METHOD.FRAMENUMBER);
                  }}
                >
                  Framenumber
                </Dropdown.Item>
                <Dropdown.Item
                  disabled={!isFaceType}
                  className={styles.dropDownItem}
                  onClick={() => {
                    onSortSheet(SORT_METHOD.FACESIZE);
                  }}
                >
                  Face size
                </Dropdown.Item>
                <Dropdown.Item
                  disabled={!isFaceType}
                  className={styles.dropDownItem}
                  onClick={() => {
                    onSortSheet(SORT_METHOD.FACECOUNT);
                  }}
                >
                  Face count in frame
                </Dropdown.Item>
                <Dropdown.Item
                  disabled={!isFaceType}
                  className={styles.dropDownItem}
                  onClick={() => {
                    onSortSheet(SORT_METHOD.FACEOCCURRENCE);
                  }}
                >
                  Occurrence of face
                </Dropdown.Item>
                <Dropdown.Item
                  disabled={!isFaceType}
                  className={styles.dropDownItem}
                  onClick={() => {
                    onSortSheet(SORT_METHOD.FACECONFIDENCE);
                  }}
                >
                  Confidence value of face
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          }
          mouseEnterDelay={1000}
          on={['hover']}
          position="right center"
          className={stylesPop.popup}
          content="Sort"
        />
        <Popup
          trigger={
            <Dropdown
              button
              className={styles.dropDownButton}
              floating
              closeOnBlur={false}
              closeOnChange={false}
              disabled={fileMissingStatus || isShotType}
              icon={<img src={iconFilter} height="18px" alt="" />}
            >
              <Dropdown.Menu className={`${styles.dropDownMenu} ${styles.dropDownMenuFilter}`}>
                <Dropdown.Item
                  disabled={!isFaceType}
                  className={`${styles.dropDownItem} ${ageFilter.enabled ? styles.dropDownItemCheckboxAndSlider : ''}`}
                  onClick={e => e.stopPropagation()}
                >
                  <Checkbox
                    data-tid="enableAgeFilterCheckbox"
                    label="Age"
                    checked={ageFilter.enabled}
                    onChange={(e, { checked }) => {
                      onFilterChange(FILTER_METHOD.AGE, {
                        enabled: checked,
                      });
                    }}
                  />
                  <Range
                    data-tid="ageRangeSlider"
                    className={`${styles.slider} ${!ageFilter.enabled ? styles.dropDownItemHidden : ''}`}
                    disabled={!isFaceType || !ageFilter.enabled}
                    min={0}
                    max={100}
                    defaultValue={[ageFilter.min, ageFilter.max]}
                    marks={{
                      0: '0',
                      100: 'max',
                    }}
                    handle={handle}
                    onAfterChange={value => {
                      onFilterChange(FILTER_METHOD.AGE, {
                        min: value[0],
                        max: value[1],
                      });
                    }}
                  />
                </Dropdown.Item>
                <Dropdown.Item
                  disabled={!isFaceType}
                  className={`${styles.dropDownItem} ${sizeFilter.enabled ? styles.dropDownItemCheckboxAndSlider : ''}`}
                  onClick={e => e.stopPropagation()}
                >
                  <Checkbox
                    data-tid="enableSizeFilterCheckbox"
                    label="Face size"
                    checked={sizeFilter.enabled}
                    onChange={(e, { checked }) => {
                      onFilterChange(FILTER_METHOD.FACESIZE, {
                        enabled: checked,
                      });
                    }}
                  />
                  <Range
                    data-tid="sizeRangeSlider"
                    className={`${styles.slider} ${!sizeFilter.enabled ? styles.dropDownItemHidden : ''}`}
                    disabled={!isFaceType || !sizeFilter.enabled}
                    min={defaultFaceSizeThreshold}
                    max={100}
                    defaultValue={[sizeFilter.min, sizeFilter.max]}
                    marks={{
                      30: 'medium',
                      75: 'close',
                      100: 'max',
                    }}
                    handle={handle}
                    onAfterChange={value => {
                      onFilterChange(FILTER_METHOD.FACESIZE, {
                        min: value[0],
                        max: value[1],
                      });
                    }}
                  />
                </Dropdown.Item>
                <Dropdown.Item
                  disabled={!isFaceType}
                  className={`${styles.dropDownItem} ${faceCountFilter.enabled ? styles.dropDownItemCheckboxAndSlider : ''}`}
                  onClick={e => e.stopPropagation()}
                >
                  <Checkbox
                    data-tid="enableSizeFilterCheckbox"
                    label="Face count in frame"
                    checked={faceCountFilter.enabled}
                    onChange={(e, { checked }) => {
                      onFilterChange(FILTER_METHOD.FACECOUNT, {
                        enabled: checked,
                      });
                    }}
                  />
                  <Range
                    data-tid="faceCountRangeSlider"
                    className={`${styles.slider} ${!faceCountFilter.enabled ? styles.dropDownItemHidden : ''}`}
                    disabled={!isFaceType || !faceCountFilter.enabled}
                    min={1}
                    max={10}
                    defaultValue={[faceCountFilter.min, faceCountFilter.max]}
                    marks={{
                      1: '1',
                      10: 'max',
                    }}
                    handle={handle}
                    onAfterChange={value => {
                      onFilterChange(FILTER_METHOD.FACECOUNT, {
                        min: value[0],
                        max: value[1],
                      });
                    }}
                  />
                </Dropdown.Item>
                <Dropdown.Item
                  disabled={!isFaceType}
                  className={`${styles.dropDownItem} ${
                    genderFilter.enabled ? styles.dropDownItemCheckboxAndSlider : ''
                  }`}
                  onClick={e => e.stopPropagation()}
                >
                  <Checkbox
                    data-tid="enableGenderFilterCheckbox"
                    label="Gender"
                    checked={genderFilter.enabled}
                    onChange={(e, { checked }) => {
                      onFilterChange(FILTER_METHOD.GENDER, {
                        enabled: checked,
                      });
                    }}
                  />
                  <div
                    className={`${styles.dropDownItemRadioGroup} ${
                      !genderFilter.enabled ? styles.dropDownItemHidden : ''
                    }`}
                  >
                    <Radio
                      data-tid="genderFemaleRadioBtn"
                      disabled={!genderFilter.enabled}
                      label={<label className={styles.label}>Female</label>}
                      name="genderGroup"
                      value="female"
                      checked={genderFilter.value === 'female'}
                      onChange={(e, { value }) => {
                        onFilterChange(FILTER_METHOD.GENDER, {
                          value,
                        });
                      }}
                    />
                    <Radio
                      data-tid="genderMaleRadioBtn"
                      disabled={!genderFilter.enabled}
                      label={<label className={styles.label}>Male</label>}
                      name="genderGroup"
                      value="male"
                      checked={genderFilter.value === 'male'}
                      onChange={(e, { value }) => {
                        onFilterChange(FILTER_METHOD.GENDER, {
                          value,
                        });
                      }}
                    />
                  </div>
                </Dropdown.Item>
                <Divider />
                <Dropdown.Item
                  disabled={!isFaceType}
                  className={`${styles.dropDownItem} ${
                    uniqueFilter.enabled ? styles.dropDownItemCheckboxAndSlider : ''
                  }`}
                  onClick={e => e.stopPropagation()}
                >
                  <Checkbox
                    data-tid="enableUniqueFilterCheckbox"
                    label="Unique faces"
                    checked={uniqueFilter.enabled}
                    onChange={(e, { checked }) => {
                      onFilterChange(FILTER_METHOD.DISTTOORIGIN, {
                        enabled: checked,
                        value: 0,
                      });
                    }}
                  />
                  <SliderWithTooltip
                    data-tid="faceUniquenessThresholdSlider"
                    className={`${styles.slider} ${!uniqueFilter.enabled ? styles.dropDownItemHidden : ''}`}
                    disabled={!isFaceType || !uniqueFilter.enabled || expandedFrameNumber !== undefined}
                    min={40}
                    max={80}
                    defaultValue={defaultFaceUniquenessThreshold * 100}
                    marks={{
                      // 50: 'unique',
                      60: 'more unique faces | less unique faces   ',
                      // 70: 'similar',
                    }}
                    handle={handle}
                    onAfterChange={value => {
                      const valueFloat = value / 100.0;
                      onChangeFaceUniquenessThreshold(valueFloat);
                      onFilterSheet(currentSheetFilter);
                      onUpdateSheetFilter(currentSheetFilter);
                    }}
                  />
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          }
          mouseEnterDelay={1000}
          on={['hover']}
          position="right center"
          className={stylesPop.popup}
          content="Filter"
        />
        <Popup
          trigger={
            <Button
              className={styles.imageButton}
              size="large"
              data-tid="duplicateSheetItemBtn"
              onClick={() => onDuplicateSheetClick(undefined, undefined)}
              disabled={fileMissingStatus}
              icon={<img src={iconCopy} height="18px" alt="" />}
            />
          }
          mouseEnterDelay={1000}
          on={['hover']}
          position="bottom center"
          className={stylesPop.popup}
          content="Duplicate MoviePrint"
        />
        {defaultView === VIEW.STANDARDVIEW && (
          <Popup
            trigger={
              <Button
                className={styles.normalButton}
                size="large"
                disabled={isFaceType}
                data-tid={
                  sheetView === SHEET_VIEW.GRIDVIEW
                    ? 'changeViewSheetToTimelineViewBtn'
                    : 'changeViewSheetToGridViewBtn'
                }
                onClick={() =>
                  onChangeSheetViewClick(
                    undefined,
                    undefined,
                    sheetView === SHEET_VIEW.GRIDVIEW ? SHEET_VIEW.TIMELINEVIEW : SHEET_VIEW.GRIDVIEW,
                  )
                }
                icon={<img src={sheetView === SHEET_VIEW.GRIDVIEW ? iconBarcode : iconGrid} height="18px" alt="" />}
              />
            }
            mouseEnterDelay={1000}
            on={['hover']}
            position="bottom center"
            className={stylesPop.popup}
            content={sheetView === SHEET_VIEW.GRIDVIEW ? 'Switch to timeline view' : 'Switch to grid view'}
          />
        )}
        {defaultView !== VIEW.STANDARDVIEW && (
          <Popup
            trigger={
              <Button
                className={styles.imageButton}
                size="large"
                disabled={defaultView === VIEW.STANDARDVIEW}
                data-tid={
                  sheetView === SHEET_VIEW.GRIDVIEW
                    ? 'changeViewSheetToTimelineViewBtn'
                    : 'changeViewSheetToGridViewBtn'
                }
                onClick={() =>
                  onChangeSheetViewClick(
                    undefined,
                    undefined,
                    sheetView === SHEET_VIEW.GRIDVIEW ? SHEET_VIEW.TIMELINEVIEW : SHEET_VIEW.GRIDVIEW,
                  )
                }
                icon={
                  <img src={sheetView === SHEET_VIEW.GRIDVIEW ? iconCutView : iconThumbView} height="18px" alt="" />
                }
              />
            }
            mouseEnterDelay={1000}
            on={['hover']}
            position="bottom center"
            className={stylesPop.popup}
            content={sheetView === SHEET_VIEW.GRIDVIEW ? 'Switch to cut view' : 'Switch to thumb view'}
          />
        )}
      </Button.Group>{' '}
      <Popup
        trigger={
          <Button
            className={`${styles.normalButton} ${defaultView === VIEW.STANDARDVIEW ? '' : styles.selected}`}
            style={{
              marginRight: '8px',
              marginLeft: '8px',
            }}
            size="large"
            circular
            data-tid={defaultView === VIEW.STANDARDVIEW ? 'showPlayerBtn' : 'hidePlayerBtn'}
            disabled={fileMissingStatus}
            onClick={() => {
              if (defaultView === VIEW.STANDARDVIEW) {
                onSetViewClick(VIEW.PLAYERVIEW);
              } else {
                onSetViewClick(VIEW.STANDARDVIEW);
              }
              return undefined;
            }}
            icon={defaultView === VIEW.STANDARDVIEW ? 'video' : 'close'}
          />
        }
        mouseEnterDelay={1000}
        on={['hover']}
        position="bottom center"
        className={stylesPop.popup}
        content={
          defaultView === VIEW.STANDARDVIEW ? (
            <span>
              Show player view <mark>2</mark>
            </span>
          ) : (
            <span>
              Hide player view <mark>2</mark>
            </span>
          )
        }
      />{' '}
      <Button.Group className={`${defaultView === VIEW.STANDARDVIEW ? '' : styles.hidden}`}>
        <Popup
          trigger={
            <Button
              className={styles.normalButton}
              size="large"
              data-tid="zoomOutBtn"
              onClick={() => onChangeDefaultZoomLevel('zoomOut')}
              icon={<img src={iconZoomOut} height="18px" alt="" />}
            />
          }
          mouseEnterDelay={1000}
          on={['hover']}
          position="bottom center"
          className={stylesPop.popup}
          content="Zoom Out"
        />
        <Popup
          trigger={
            <Button
              className={styles.normalButton}
              size="large"
              data-tid="zoomFitBtn"
              onClick={() => onChangeDefaultZoomLevel('resetZoom')}
              icon={<img src={iconExpand} height="18px" alt="" />}
            />
          }
          mouseEnterDelay={1000}
          on={['hover']}
          position="bottom center"
          className={stylesPop.popup}
          content="Fit MoviePrint"
        />
        <Popup
          trigger={
            <Button
              className={styles.normalButton}
              size="large"
              data-tid="zoomInBtn"
              onClick={() => onChangeDefaultZoomLevel('zoomIn')}
              icon={<img src={iconZoomIn} height="18px" alt="" />}
            />
          }
          mouseEnterDelay={1000}
          on={['hover']}
          position="bottom center"
          className={stylesPop.popup}
          content="Zoom In"
        />
      </Button.Group>{' '}
      <Button.Group className={`${defaultView === VIEW.STANDARDVIEW ? '' : styles.hidden}`}>
        <Popup
          trigger={
            <Button
              className={styles.normalButton}
              size="large"
              circular
              data-tid={visibilityFilter === THUMB_SELECTION.ALL_THUMBS ? 'showOnlyVisibleBtn' : 'showHiddenBtn'}
              onClick={onToggleShowHiddenThumbsClick}
              icon={
                <img
                  src={visibilityFilter === THUMB_SELECTION.ALL_THUMBS ? iconHide : iconUnhide}
                  height="18px"
                  alt=""
                />
              }
            />
          }
          mouseEnterDelay={1000}
          on={['hover']}
          position="bottom center"
          className={stylesPop.popup}
          content={visibilityFilter === THUMB_SELECTION.ALL_THUMBS ? 'Show visible thumbs only' : 'Show hidden thumbs'}
        />
        <Popup
          trigger={
            <Button
              className={styles.imageButton}
              size="large"
              disabled={!isGridViewAndDefault}
              data-tid="toggleHeaderBtn"
              onClick={() => onToggleHeaderClick()}
            >
              <img src={iconHeader} height="18px" alt="" />
            </Button>
          }
          mouseEnterDelay={1000}
          on={['hover']}
          position="bottom center"
          className={stylesPop.popup}
          content="Show header"
        />
        <Popup
          trigger={
            <Button
              className={styles.imageButton}
              size="large"
              disabled={!isGridViewAndDefault}
              data-tid="showThumbInfoBtn"
              onClick={() => {
                const current = defaultThumbInfo;
                const currentIndex = THUMB_INFO_OPTIONS.findIndex(item => item.value === current);
                const nextIndex = currentIndex < THUMB_INFO_OPTIONS.length - 1 ? currentIndex + 1 : 0;
                onThumbInfoClick(THUMB_INFO_OPTIONS[nextIndex].value);
              }}
            >
              <img src={iconFrameInfo} height="18px" alt="" />
            </Button>
          }
          mouseEnterDelay={1000}
          on={['hover']}
          position="bottom center"
          className={stylesPop.popup}
          content="Show frames, timecode or none"
        />
        <Popup
          trigger={
            <Button
              className={styles.imageButton}
              size="large"
              data-tid="toggleFaceRectBtn"
              disabled={!isFaceType}
              onClick={() => onToggleFaceRectClick()}
              icon={<img src={iconShowFaceRect} height="18px" alt="" />}
            />
          }
          mouseEnterDelay={1000}
          on={['hover']}
          position="bottom center"
          className={stylesPop.popup}
          content="Toggle face rectangle"
        />
        <Popup
          trigger={
            <Dropdown
              button
              className={styles.dropDownButton}
              floating
              closeOnBlur={false}
              closeOnChange={false}
              disabled={fileMissingStatus}
              icon={<img src={iconCaretDown} height="18px" alt="" />}
            >
              <Dropdown.Menu className={styles.dropDownMenu}>
                <Dropdown.Item
                  className={`${styles.dropDownItem} ${styles.dropDownItemIconInvert}`}
                  onClick={() => onToggleImagesClick()}
                  icon={<img src={defaultShowImages ? iconNoImage : iconImage} height="18px" alt="" />}
                  text="Toggle images"
                />
                <Dropdown.Item
                  className={styles.dropDownItem}
                  onClick={() => optimiseGridLayout()}
                  icon={<img src={icon3x3} height="18px" alt="" />}
                  text="Optimise grid layout"
                />
              </Dropdown.Menu>
            </Dropdown>
          }
          mouseEnterDelay={1000}
          on={['hover']}
          position="right center"
          className={stylesPop.popup}
          content="Additional settings"
        />
      </Button.Group>
    </div>
  );
};
export default FloatingMenu;
