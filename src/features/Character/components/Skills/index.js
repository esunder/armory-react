// @flow

import get from 'lodash/get';
import cx from 'classnames';

import TooltipTrigger from 'common/components/TooltipTrigger';
import Icon from 'common/components/Icon';
import styles from './styles.less';

const Skill = ({ data, className }: { data: {}, className?: string }) => (
  <TooltipTrigger type="skill" data={data || 'No Skill Selected'}>
    <Icon src={get(data, 'icon')} size="mediumSmall" className={cx(styles.skill, className)} />
  </TooltipTrigger>
);

type SkillsProps = {
  skills: {},
  characterSkills: {
    heal: number,
    elite: number,
  },
  professionData: {},
  mainHand: string,
  offHand: string,
  className?: string,
};

const Skills = ({
  skills,
  characterSkills,
  professionData,
  mainHand,
  offHand,
  className,
}: SkillsProps) => {
  const utilities = get(characterSkills, 'utilities', [undefined, undefined, undefined]);
  const mainHandSkills = get(professionData, `weapons[${mainHand}].skills`, []);
  const offHandSkills = get(professionData, `weapons[${offHand}].skills`, []);

  return (
    <div className={cx(styles.root, className)}>
      {mainHandSkills.map(({ id }) => <Skill key={id} data={skills[id]} />)}
      {offHandSkills.map(({ id }) => <Skill key={id} data={skills[id]} />)}
      <Skill data={skills[characterSkills.heal]} className={styles.heal} />
      {utilities.map((id, index) => <Skill key={id || index} data={skills[id]} />)}
      <Skill data={skills[characterSkills.elite]} className={styles.elite} />
    </div>
  );
};

export default Skills;
