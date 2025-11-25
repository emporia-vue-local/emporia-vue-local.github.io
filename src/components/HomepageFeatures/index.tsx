import type { ReactNode } from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Rapid response",
    Svg: require("@site/static/img/undraw_visual-data_1eya.svg").default,
    description: (
      <>
        Data updates every five seconds. This allows for quick-responding
        automations and rapid feedback when your consumption changes.
      </>
    ),
  },
  {
    title: "Totally offline",
    Svg: require("@site/static/img/undraw_connection-lost_am29.svg").default,
    description: (
      <>
        Everything is completely local, and nothing leaves your network. No
        internet? No problem, everything still works fine.
      </>
    ),
  },
  {
    title: "You're in control",
    Svg: require("@site/static/img/undraw_programmer_raqr.svg").default,
    description: (
      <>
        All the source code and configuration is available for you to use and
        modify to fit your particular situation. Data feeds into{" "}
        <a href="https://www.home-assistant.io/">Home Assistant</a>, where it
        can be visualized and acted upon.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => <Feature key={idx} {...props} />)}
        </div>
      </div>
    </section>
  );
}
