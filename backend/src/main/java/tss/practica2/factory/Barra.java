package tss.practica2.factory;

import java.util.ArrayList;

import lombok.Data;

@Data
public class Barra {
    
    private double longitud;
    private ArrayList<Fierro> fierros;

    public Barra(){
        this.longitud = 6.0;
        fierros = new ArrayList<>();
    }

    public void addFierro(Fierro fierro){
        if (longitud >= fierro.getLongitud()){
            fierros.add(fierro);
            longitud = longitud- fierro.getLongitud();
        }
    }
}
