using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class HelloRay : MonoBehaviour
{
    public int damagePerShot = 20;
    public float timeBetweenBullets = 0.15f;
    public float range = 100f;


    float timer;
    Ray shootRay = new Ray();
    RaycastHit shootHit;
    int shootableMask;
    ParticleSystem gunParticles;
    LineRenderer gunLine;
    //AudioSource gunAudio;
    //Light gunLight;
    float effectsDisplayTime = 0.2f;


    void Awake()
    {
        shootableMask = LayerMask.GetMask("Shootable");
        gunParticles = GetComponent<ParticleSystem>();
        gunLine = GetComponent<LineRenderer>();
        //gunAudio = GetComponent<AudioSource>();
       // gunLight = GetComponent<Light>();
    }


    void Update()
    {
        timer += Time.deltaTime;

        if (Input.GetButton("Fire1") && timer >= timeBetweenBullets && Time.timeScale != 0)
        {
            Shoot();
        }

        if (timer >= timeBetweenBullets * effectsDisplayTime)
        {
            DisableEffects();
        }
    }


    public void DisableEffects()
    {
        //gunLine.enabled = false;
        //gunLight.enabled = false;
    }


    void Shoot()
    {
        timer = 0f;

        //gunAudio.Play();

       // gunLight.enabled = true;

        gunParticles.Stop();
        gunParticles.Play();

        gunLine.enabled = true;
        gunLine.SetPosition(0, transform.position);

        shootRay.origin = transform.position;
        shootRay.direction = transform.forward;

        if (Physics.Raycast(shootRay, out shootHit, range, shootableMask))
        {
            //EnemyHealth enemyHealth = shootHit.collider.GetComponent<EnemyHealth>();
            Debug.Log(shootHit.collider.name);
            //if (enemyHealth != null)
            //{
            //    enemyHealth.TakeDamage(damagePerShot, shootHit.point);
            //}
            gunLine.SetPosition(1, shootHit.point);
        }
        else
        {
            gunLine.SetPosition(1, shootRay.origin + shootRay.direction * range);
        }
    }

    // Update is called once per frame
    void ONjiji()
    {
        if (Input.GetMouseButton(0))
        {
            //从物体中心创建一条指向前方的射线ray
            // Ray ray = new Ray(transform.position, transform.forward);
            //产生一条从摄像机产生、经过屏幕上光标的射线。当相机为perspective模式，射线在相机梯形视野内发散；若为orthoGraphic，则为垂直与相机面的直线段
            Ray camerRay = Camera.main.ScreenPointToRay(Input.mousePosition);

            /*Raycast(transform.position, Vector.forward, distance, (Enemy))*/
        }

    }

}
